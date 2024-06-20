// ChatList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ChatList = () => {
  const [chatHistories, setChatHistories] = useState([]);

  useEffect(() => {
    const fetchAllChatHistories = async () => {
      try {
        // Fetch all chat histories from the backend
        const response = await axios.get('http://localhost:3002/allChatHistory'); // Replace with your backend URL
        setChatHistories(response.data.chatHistories);
      } catch (error) {
        console.error('Error fetching chat histories:', error);
      }
    };

    // Fetch chat histories initially
    fetchAllChatHistories();

    // Set up interval to fetch chat histories every 1 second
    const interval = setInterval(() => {
      fetchAllChatHistories();
    }, 1000); // 1000 milliseconds = 1 second

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="chat-list">
      <h2>All Chat Histories</h2>
      {chatHistories.map((chatHistory, index) => (
        <div key={index} className="chat-container">
          <h4>Chats for {chatHistory.chatId}</h4>
          <ul>
            {chatHistory.messages.map((message, index) => (
              <li key={index} className={`message ${message.role}`}>
                <strong>{message.role}: </strong>
                {message.content}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ChatList;
