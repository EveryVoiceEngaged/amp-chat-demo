import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import { withAuthenticator } from "@aws-amplify/ui-react";
import React, { useState, useEffect } from "react";
import { generateClient } from 'aws-amplify/api';
import * as mutations from "./graphql/mutations";
import * as subscriptions from "./graphql/subscriptions";

const client = generateClient();

function formatTime(isoString) {
  const date = new Date(isoString);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function App({ user, signOut }) {
  console.log(user);
  const userEmail = user.signInDetails.loginId;
  const [chats, setChats] = useState([]);

  useEffect(() => {
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

  return (
    <div>
      <div className="flex justify-end px-4 py-2">
        <button
          type="button"
          className="relative inline-flex items-center gap-x-1.5 rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          onClick={signOut}
        >
          Sign Out
        </button>
      </div>
      <div className="flex justify-center items-center h-screen w-full">
        <div className={`w-3/4 flex flex-col`}>
          {chats.map((chat, index) => (
            <div key={index} className="mb-4">
              <div className="flex items-baseline">
                <strong className="mr-2">{chat.email}:</strong>
                <span>{chat.message}</span>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {formatTime(chat.timestamp)}
              </div>
            </div>
          ))}
          <div>
            <div className="relative mt-2 flex items-center">
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
    </div>
  );
}

export default withAuthenticator(App);