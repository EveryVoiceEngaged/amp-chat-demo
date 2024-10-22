import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import { withAuthenticator } from "@aws-amplify/ui-react";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { generateClient } from 'aws-amplify/api';
import * as mutations from "./graphql/mutations";
import * as subscriptions from "./graphql/subscriptions";
import * as queries from "./graphql/queries";
import Avatar from "react-avatar-edit";

const client = generateClient();

const UserPresenceIndicator = ({ email, avatar }) => {
  const initial = email[0].toUpperCase();

  return (
    <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white text-sm font-semibold overflow-hidden">
      {avatar ? (
        <img src={avatar} alt={`${email}'s avatar`} className="w-full h-full object-cover" />
      ) : (
        initial
      )}
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
  const [isPublic, setIsPublic] = useState(true);
  const [recipient, setRecipient] = useState('');
  const messagesEndRef = useRef(null);
  const lastActiveRef = useRef(Date.now());
  const [attachDetachText, setAttachDetachText] = useState("Attach");
  const [attachment, setAttachment] = useState(null);
  const [attachmentType, setAttachmentType] = useState(null);
  const [attachmentUrl, setAttachmentUrl] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  const onCrop = (preview) => {
    setAvatarPreview(preview);
    updateUserPresence('online', preview);
  };

  const onClose = () => {
    setAvatarPreview(null);
  };
  
  const updateUserPresence = useCallback(async (status = 'online', avatar = null) => {
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
              lastActiveTimestamp: currentTimestamp,
              avatar: avatar || getUserPresence.data.getUserPresence.avatar
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
              lastActiveTimestamp: currentTimestamp,
              avatar: avatar
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
      const currentTime = Date.now();
      const activeUsers = presenceData.data.listUserPresences.items.filter(u => {
        const lastActiveTime = new Date(u.lastActiveTimestamp).getTime();
        const timeDifference = currentTime - lastActiveTime;
        return u.status === 'online' && timeDifference < 60000; // Consider users active for 1 minute
      });
      setPresentUsers(prevUsers => {
        if (JSON.stringify(prevUsers) !== JSON.stringify(activeUsers)) {
          return activeUsers;
        }
        return prevUsers;
      });
    } catch (error) {
      console.error('Error fetching user presence:', error);
    }
  }, []);


  const handleVisibilityChange = useCallback(() => {
    if (document.hidden) {
      updateUserPresence('away');
    } else {
      updateUserPresence('online');
    }
  }, [updateUserPresence]);

  const handleActivityDetection = useCallback(() => {
    const now = Date.now();
    if (now - lastActiveRef.current > 60000) {
      updateUserPresence('online');
    }
    lastActiveRef.current = now;
  }, [updateUserPresence]);

  useEffect(() => {
    fetchChats();
    fetchUserPresence();
    updateUserPresence('online');
    
    const activityEvents = ['mousedown', 'keydown', 'touchstart', 'mousemove'];
    activityEvents.forEach(event => {
      window.addEventListener(event, handleActivityDetection);
    });

    document.addEventListener('visibilitychange', handleVisibilityChange);

    const presenceInterval = setInterval(() => {
      const now = Date.now();
      if (now - lastActiveRef.current > 60000) {
        updateUserPresence('away');
      }
    }, 60000); // Check every minute
    
    const fetchInterval = setInterval(fetchUserPresence, 10000);

    const handleBeforeUnload = () => {
      updateUserPresence('offline');
    };
  
    window.addEventListener('beforeunload', handleBeforeUnload);
  
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
            const lastActiveTime = new Date(data.onUpdateUserPresence.lastActiveTimestamp).getTime();
            const currentTime = Date.now();
            const timeDifference = currentTime - lastActiveTime;
            if (data.onUpdateUserPresence.status === 'online' && timeDifference < 60000) {
              return [...updatedUsers, data.onUpdateUserPresence];
            }
            return updatedUsers;
          });
        }
      },
      error: (err) => console.error(err)
    });

    return () => {
      clearInterval(presenceInterval);
      clearInterval(fetchInterval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      activityEvents.forEach(event => {
        window.removeEventListener(event, handleActivityDetection);
      });
      window.removeEventListener('beforeunload', handleBeforeUnload);
      chatSub.unsubscribe();
      deleteChatSub.unsubscribe();
      reactionSub.unsubscribe();
      updateReactionSub.unsubscribe();
      presenceSub.unsubscribe();
      updateUserPresence('offline');
    };
  }, [updateUserPresence, fetchChats, fetchUserPresence, handleVisibilityChange, handleActivityDetection]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats]);

  const handleKeyUp = async (e) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      try {
        const newChat = await client.graphql({
          query: mutations.createChat,
          variables: {
            input: {
              message: e.target.value.trim(),
              email: userEmail,
              timestamp: new Date().toISOString(),
              isPublic: isPublic,
              recipient: isPublic ? null : recipient,
              avatar: presentUsers.find(user => user.id === userEmail).avatar
            },
          },
        });
        console.log("New chat created with avatar:", newChat.data.createChat.avatar);
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

  const ChatMessage = ({ chat, handleDelete, handleReaction }) => {
    const emojis = ['👍', '❤️', '😂'];
  
    return (
      <div key={chat.id} className="mb-4 flex flex-col">
        <div className="flex items-start">
          <div className="mr-2">
            {chat.avatar ? (
              <img src={chat.avatar} alt={`${chat.email}'s avatar`} className="w-8 h-8 rounded-full" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white text-sm font-semibold">
                {chat.email[0].toUpperCase()}
              </div>
            )}
          </div>
          <div className="flex-grow">
            <div className="flex items-baseline">
              <strong className="mr-2">{chat.email}:</strong>
              <span>{chat.message}</span>
            </div>
            {chat.attachment && (
              <div className="mt-2">
                {chat.attachmentType === "image" ? (
                  <img src={chat.attachment} alt="attachment" className="max-w-xs rounded" />
                ) : chat.attachmentType === "video" ? (
                  <video src={chat.attachment} controls className="max-w-xs rounded" />
                ) : chat.attachmentType === "audio" ? (
                  <audio src={chat.attachment} controls />
                ) : null}
              </div>
            )}
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
            <UserPresenceIndicator key={user.email} email={user.email} avatar={user.avatar} />
          ))}
        </div>
        <div className="flex items-center">
          <Avatar
            width={200}
            height={80}
            onCrop={onCrop}
            onClose={onClose}
          />
          <button
            type="button"
            className="ml-4 relative inline-flex items-center gap-x-1.5 rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            onClick={signOut}
          >
            Sign Out
          </button>
          </div>
      </div>
      <div className="flex-grow flex justify-center items-center p-4">
      <div className="w-3/4 flex flex-col h-[80vh]">
        <div className="flex-grow overflow-y-auto mb-4 p-4 border border-gray-300 rounded">
          {chats
            .filter(chat => 
              isPublic ? chat.isPublic : (!chat.isPublic && 
                ((chat.email === userEmail && chat.recipient === recipient) || 
                (chat.email === recipient && chat.recipient === userEmail))
              )
            )
            .map((chat) => (
              <ChatMessage 
                key={chat.id}
                chat={chat}
                handleDelete={handleDelete}
                handleReaction={handleReaction}
              />
            ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="relative mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="isPublic">
            Public Message
          </label>
          <input
            type="checkbox"
            id="isPublic"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
            className="mr-2 leading-tight"
          />
          {!isPublic && (
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="recipient">
                Recipient
              </label>
              <select
                id="recipient"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                <option value="" disabled>Select a user</option>
                {presentUsers.map(user => (
                  <option key={user.email} value={user.email}>{user.email}</option>
                ))}
              </select>
            </div>
          )}
        </div>
          <div className="relative">
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