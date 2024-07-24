import React, { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/api';
import * as mutations from "./graphql/mutations";
import * as queries from "./graphql/queries";
import md5 from 'md5';

const client = generateClient();

const UserProfile = ({ user, onProfileUpdate }) => {
  const [username, setUsername] = useState('');
  const [gravatarEmail, setGravatarEmail] = useState('');

  useEffect(() => {
    fetchUserProfile();
  }, [user]);

  const fetchUserProfile = async () => {
    try {
      const userData = await client.graphql({
        query: queries.getUser,
        variables: { id: user.signInDetails.loginId }
      });
      if (userData.data.getUser) {
        setUsername(userData.data.getUser.username || '');
        setGravatarEmail(userData.data.getUser.gravatarEmail || '');
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = await client.graphql({
        query: mutations.updateUser,
        variables: {
          input: {
            id: user.signInDetails.loginId,
            username,
            gravatarEmail
          }
        }
      });
      onProfileUpdate(updatedUser.data.updateUser);
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };

  const gravatarUrl = `https://www.gravatar.com/avatar/${md5(gravatarEmail.toLowerCase().trim())}?d=identicon`;

  return (
    <div className="max-w-md mx-auto mt-10">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gravatarEmail">
            Gravatar Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="gravatarEmail"
            type="email"
            placeholder="Gravatar Email"
            value={gravatarEmail}
            onChange={(e) => setGravatarEmail(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Update Profile
          </button>
          <img src={gravatarUrl} alt="Gravatar" className="w-10 h-10 rounded-full" />
        </div>
      </form>
    </div>
  );
};

export default UserProfile;