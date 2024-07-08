import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import { withAuthenticator } from "@aws-amplify/ui-react";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { generateClient } from 'aws-amplify/api';
import * as mutations from "./graphql/mutations";
import * as subscriptions from "./graphql/subscriptions";
import * as queries from "./graphql/queries";

const client = generateClient();

const UserPresenceIndicator = ({ email }) => {
  const initials = email
    .split('@')[0]
    .split('.')
    .map(name => name[0].toUpperCase())
    .join('');

  return (
    <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white text-sm font-semibold">
      {initials}
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

  const updateUserPresence = useCallback(async (status = 'online') => {
    try {
      await client.graphql({
        query: mutations.updateUserPresence,
        variables: {
          input: {
            id: userEmail, // Assuming email is used as the ID
            email: userEmail,
            status: status
          }
        }
      });
    } catch (error) {
      console.error('Error updating user presence:', error);
    }
  }, [userEmail]);

  const fetchChats = useCallback(async () => {
    try {
      const chatData = await client.graphql({
        query: queries.listChats,
        variables: { limit: 1000 }
      });
      const sortedChats = chatData.data.listChats.items.sort(
        (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
      );
      setChats(sortedChats);
    } catch (error) {
      console.error('Error fetching chats:', error);
    }
  }, []);

  const fetchUserPresence = useCallback(async () => {
    try {
      const presenceData = await client.graphql({
        query: queries.listUserPresences
      });
      setPresentUsers(presenceData.data.listUserPresences.items.filter(u => u.status === 'online'));
    } catch (error) {
      console.error('Error fetching user presence:', error);
    }
  }, []);

  useEffect(() => {
    fetchChats();
    fetchUserPresence();
    updateUserPresence();
    
    const chatSub = client.graphql({
      query: subscriptions.onCreateChat
    }).subscribe({
      next: ({ data }) => {
        if (data.onCreateChat) {
          setChats((prev) => [...prev, data.onCreateChat]);
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
            if (data.onUpdateUserPresence.status === 'online') {
              return [...updatedUsers, data.onUpdateUserPresence];
            }
            return updatedUsers;
          });
        }
      },
      error: (err) => console.error(err)
    });

    return () => {
      chatSub.unsubscribe();
      presenceSub.unsubscribe();
      updateUserPresence('offline');
    };
  }, [updateUserPresence, fetchChats, fetchUserPresence]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats]);

  const handleKeyUp = async (e) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      try {
        await client.graphql({
          query: mutations.createChat,
          variables: {
            input: {
              message: e.target.value.trim(),
              email: userEmail,
              timestamp: new Date().toISOString()
            },
          },
        });
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
              <div key={chat.id} className="mb-4 flex items-start">
                <div className="flex-grow">
                  <div className="flex items-baseline">
                    <strong className="mr-2">{chat.email}:</strong>
                    <span>{chat.message}</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {formatTime(chat.timestamp)}
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(chat.id)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  &#x2715;
                </button>
              </div>
            ))}
            <div ref={messagesEndRef} />
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