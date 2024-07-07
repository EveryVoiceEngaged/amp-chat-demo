import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import { withAuthenticator } from "@aws-amplify/ui-react";
import React, { useState, useEffect, useRef } from "react";
import { generateClient } from 'aws-amplify/api';
import * as mutations from "./graphql/mutations";
import * as subscriptions from "./graphql/subscriptions";
import * as queries from "./graphql/queries";

const client = generateClient();

function formatTime(isoString) {
  const date = new Date(isoString);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function App({ user, signOut }) {
  const userEmail = user.signInDetails.loginId;
  const [chats, setChats] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    fetchChats();
    
    const sub = client.graphql({
      query: subscriptions.onCreateChat
    }).subscribe({
      next: ({ data }) => {
        if (data.onCreateChat) {
          setChats((prev) => [...prev, data.onCreateChat]);
        }
      },
      error: (err) => console.error(err)
    });

    return () => {
      sub.unsubscribe();
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [chats]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchChats = async () => {
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
  };

  const handleKeyUp = async (e) => {
    if (e.key === "Enter") {
      try {
        const result = await client.graphql({
          query: mutations.createChat,
          variables: {
            input: {
              message: e.target.value,
              email: userEmail,
              timestamp: new Date().toISOString()
            },
          },
        });
        console.log('Chat created:', result);
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
      <div className="flex justify-end px-4 py-2">
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
            />
            <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
              <kbd className="inline-flex items-center rounded border border-gray-200 px-1 font-sans text-xs text-gray-400">
                Enter
              </kbd>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuthenticator(App);