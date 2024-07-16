import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import { withAuthenticator } from "@aws-amplify/ui-react";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { generateClient } from 'aws-amplify/api';
import * as mutations from "./graphql/mutations";
import * as subscriptions from "./graphql/subscriptions";
import * as queries from "./graphql/queries";
import { uploadData } from "aws-amplify/storage";

const client = generateClient();

const UserPresenceIndicator = ({ email }) => {
  const initial = email[0].toUpperCase();

  return (
    <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white text-sm font-semibold">
      {initial}
    </div>
  );
};

function formatTime(isoString) {
  const date = new Date(isoString);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function App({ signOut, user }) {
  const userEmail = user.signInDetails.loginId;
  const [chats, setChats] = useState([]);
  const [presentUsers, setPresentUsers] = useState([]);
  const messagesEndRef = useRef(null);
  const [attachment, setAttachment] = useState(null);
  
  const updateUserPresence = useCallback(async (status = 'online') => {
    try {
      console.log(`Updating presence for ${userEmail} to ${status}`);
      
      const getUserPresence = await client.graphql({
        query: queries.getUserPresence,
        variables: { id: userEmail }
      });
  
      const currentTimestamp = new Date().toISOString();
  
      if (getUserPresence.data.getUserPresence) {
        const response = await client.graphql({
          query: mutations.updateUserPresence,
          variables: {
            input: {
              id: userEmail,
              email: userEmail,
              status: status,
              lastActiveTimestamp: currentTimestamp
            }
          }
        });
        console.log('User presence updated:', response);
      } else {
        const response = await client.graphql({
          query: mutations.createUserPresence,
          variables: {
            input: {
              id: userEmail,
              email: userEmail,
              status: status,
              lastActiveTimestamp: currentTimestamp
            }
          }
        });
        console.log('User presence created:', response);
      }
    } catch (error) {
      console.error('Error updating user presence:', error);
      console.error('Error details:', JSON.stringify(error, null, 2));
    }
  }, [userEmail]);

  const fetchChats = useCallback(async () => {
    try {
      const chatData = await client.graphql({
        query: queries.listChats,
        variables: { 
          limit: 1000,
          nextToken: null,
          filter: null,
        }
      });
      
      // Fetch reactions for each chat
      const chatsWithReactions = await Promise.all(chatData.data.listChats.items.map(async (chat) => {
        const reactionData = await client.graphql({
          query: queries.listReactions,
          variables: {
            filter: { chatReactionsId: { eq: chat.id } }
          }
        });
        
        return {
          ...chat,
          reactions: reactionData.data.listReactions.items
        };
      }));
  
      const sortedChats = chatsWithReactions
        .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
      
      setChats(sortedChats);
    } catch (error) {
      console.error('Error fetching chats:', error);
      console.error('Error details:', JSON.stringify(error, null, 2));
    }
  }, []);

  const fetchUserPresence = useCallback(async () => {
    try {
      const presenceData = await client.graphql({
        query: queries.listUserPresences
      });
      const currentTime = new Date();
      const activeUsers = presenceData.data.listUserPresences.items.filter(u => {
        const lastActiveTime = new Date(u.lastActiveTimestamp);
        const timeDifference = currentTime - lastActiveTime;
        return u.status === 'online' && timeDifference < 5000;
      });
      setPresentUsers(activeUsers);
    } catch (error) {
      console.error('Error fetching user presence:', error);
    }
  }, []);

  useEffect(() => {
    fetchChats();
    fetchUserPresence();
    updateUserPresence();
    
    const intervalId = setInterval(() => {
      updateUserPresence();
      fetchUserPresence();
    }, 5000);
  
    const chatSub = client.graphql({
      query: subscriptions.onCreateChat
    }).subscribe({
      next: ({ data }) => {
        if (data.onCreateChat) {
          setChats((prev) => {
            if (!prev.some(chat => chat.id === data.onCreateChat.id)) {
              return [...prev, {...data.onCreateChat, reactions: []}];
            }
            return prev;
          });
        }
      },
      error: (err) => console.error(err)
    });
  
    const deleteChatSub = client.graphql({
      query: subscriptions.onDeleteChat
    }).subscribe({
      next: ({ data }) => {
        if (data.onDeleteChat) {
          setChats((prev) => prev.filter(chat => chat.id !== data.onDeleteChat.id));
        }
      },
      error: (err) => console.error(err)
    });
  
    const reactionSub = client.graphql({
      query: subscriptions.onCreateReaction
    }).subscribe({
      next: ({ data }) => {
        if (data.onCreateReaction) {
          setChats((prev) => prev.map(chat => 
            chat.id === data.onCreateReaction.chatReactionsId
              ? { ...chat, reactions: [...chat.reactions, data.onCreateReaction] }
              : chat
          ));
        }
      },
      error: (err) => console.error(err)
    });
  
    const updateReactionSub = client.graphql({
      query: subscriptions.onUpdateReaction
    }).subscribe({
      next: ({ data }) => {
        if (data.onUpdateReaction) {
          setChats((prev) => prev.map(chat => 
            chat.id === data.onUpdateReaction.chatReactionsId
              ? { 
                  ...chat, 
                  reactions: chat.reactions.map(reaction =>
                    reaction.id === data.onUpdateReaction.id
                      ? data.onUpdateReaction
                      : reaction
                  )
                }
              : chat
          ));
        }
      },
      error: (err) => console.error(err)
    });
  
    const presenceSub = client.graphql({
      query: subscriptions.onUpdateUserPresence
    }).subscribe({
      next: ({ data }) => {
        if (data.onUpdateUserPresence) {
          setPresentUsers((prev) => {
            const updatedUsers = prev.filter(u => u.email !== data.onUpdateUserPresence.email);
            const lastActiveTime = new Date(data.onUpdateUserPresence.lastActiveTimestamp);
            const currentTime = new Date();
            const timeDifference = currentTime - lastActiveTime;
            if (data.onUpdateUserPresence.status === 'online' && timeDifference < 5000) {
              return [...updatedUsers, data.onUpdateUserPresence];
            }
            return updatedUsers;
          });
        }
      },
      error: (err) => console.error(err)
    });
  
    const handleBeforeUnload = () => {
      updateUserPresence('offline');
    };
  
    window.addEventListener('beforeunload', handleBeforeUnload);
  
    return () => {
      clearInterval(intervalId);
      chatSub.unsubscribe();
      deleteChatSub.unsubscribe();
      reactionSub.unsubscribe();
      updateReactionSub.unsubscribe();
      presenceSub.unsubscribe();
      updateUserPresence('offline');
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [updateUserPresence, fetchChats, fetchUserPresence]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats]);

  const handleKeyUp = async (e) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      try {
        let attachmentData = null;
        let attachmentType = null;
        if (attachment !== null) {
          attachmentType = attachment.type.split('/')[0];
          const attachmentKey = `/attachments/${new Date().getTime()}-${attachment.name}`;
          attachmentData = await uploadData({
            path: attachmentKey,
            data: await attachment.arrayBuffer(),
            options: {
              contentType: attachment.type
            }
          });
          setAttachment(null);
        }
        const newChat = await client.graphql({
          query: mutations.createChat,
          variables: {
            input: {
              message: e.target.value.trim(),
              email: userEmail,
              timestamp: new Date().toISOString(),
              attachment: attachmentData.path,
              attachmentType: attachmentType
            },
          },
        });
        setChats((prev) => [...prev, {...newChat.data.createChat, reactions: []}]);
        e.target.value = "";
      } catch (error) {
        console.error('Error creating chat:', error);
      }
    }
  };

  const handleDelete = async (chatId) => {
    try {
      await client.graphql({
        query: mutations.deleteChat,
        variables: {
          input: {
            id: chatId
          },
        },
      });
      setChats(chats.filter(chat => chat.id !== chatId));
    } catch (error) {
      console.error('Error deleting chat:', error);
    }
  };

  const handleReaction = async (chatId, emoji) => {
    try {
      const chat = chats.find(c => c.id === chatId);
      if (!chat) {
        console.error('Chat not found:', chatId);
        return;
      }

      const existingReaction = chat.reactions.find(r => r.emoji === emoji);

      if (existingReaction) {
        console.log('Updating existing reaction:', existingReaction);
        const updatedReaction = await client.graphql({
          query: mutations.updateReaction,
          variables: {
            input: {
              id: existingReaction.id,
              count: existingReaction.count + 1
            },
          },
        });
        console.log('Reaction updated:', updatedReaction);
      } else {
        console.log('Creating new reaction for chat:', chatId);
        const newReaction = await client.graphql({
          query: mutations.createReaction,
          variables: {
            input: {
              emoji: emoji,
              count: 1,
              chatReactionsId: chatId
            },
          },
        });
        console.log('New reaction created:', newReaction);
      }
    } catch (error) {
      console.error('Error handling reaction:', error);
      console.error('Error details:', JSON.stringify(error, null, 2));
      console.error('Input that caused error:', {
        emoji: emoji,
        count: 1,
        chatReactionsId: chatId
      });
    }
  };

  const openFileDialog = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*, video/*, audio/*";
    input.onchange = async (e) => {
      const file = e.target.files[0];
      setAttachment(file);
    };
    input.click();
  };

  const ChatMessage = ({ chat, handleDelete, handleReaction }) => {
    const emojis = ['👍', '❤️', '😂'];
  
    return (
      <div key={chat.id} className="mb-4 flex flex-col">
        <div className="flex items-start">
          <div className="flex-grow">
            <div className="flex items-baseline">
              <strong className="mr-2">{chat.email}:</strong>
              <span>{chat.message}</span>
            </div>
            {
              (chat.attachment) ? (
                chat.attachmentType === "image" ? <img src={chat.attachment} alt="attachment" className="w-1/2" /> :
                chat.attachmentType === "video" ? <video src={chat.attachment} controls className="w-1/2" /> :
                chat.attachmentType === "audio" ? <audio src={chat.attachment} controls className="w-1/2" /> : null
              ) : null
            }
            <div className="flex mt-1">
              {emojis.map((emoji) => {
                const reaction = chat.reactions.find(r => r.emoji === emoji);
                const count = reaction ? reaction.count : 0;
                return (
                  <button 
                    key={emoji} 
                    onClick={() => handleReaction(chat.id, emoji)} 
                    className="mr-2 px-3 py-1 bg-gray-200 rounded-full text-sm hover:bg-gray-300"
                  >
                    {emoji} {count > 0 && count}
                  </button>
                );
              })}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {formatTime(chat.timestamp)}
            </div>
          </div>
          {chat.email === userEmail && (
            <button
              onClick={() => handleDelete(chat.id)}
              className="ml-2 text-red-500 hover:text-red-700"
            >
              &#x2715;
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex justify-between items-center px-4 py-2 bg-gray-100">
        <div className="flex space-x-2">
          {presentUsers.map((user) => (
            <UserPresenceIndicator key={user.email} email={user.email} />
          ))}
        </div>
        <button
          type="button"
          className="relative inline-flex items-center gap-x-1.5 rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          onClick={signOut}
        >
          Sign Out
        </button>
      </div>
      <div className="flex-grow flex justify-center items-center p-4">
        <div className="w-3/4 flex flex-col h-[80vh]">
          <div className="flex-grow overflow-y-auto mb-4 p-4 border border-gray-300 rounded">
            {chats.map((chat) => (
              <ChatMessage 
                key={chat.id}
                chat={chat}
                handleDelete={handleDelete}
                handleReaction={handleReaction}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="relative">
			      <button onClick={openFileDialog}>Attach</button>
            <input
              type="text"
              name="search"
              id="search"
              onKeyUp={handleKeyUp}
              className="block w-full rounded-md border-0 py-1.5 pr-14 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Type a message and press Enter..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuthenticator(App);