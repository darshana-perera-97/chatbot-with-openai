import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [chatId, setChatId] = useState(null); // State to store chatId

  useEffect(() => {
    // Generate or fetch chatId when component mounts
    const newChatId = localStorage.getItem('chatId');
    if (newChatId) {
      setChatId(newChatId);
      fetchChatHistory(newChatId); // Fetch existing chat history if available
    } else {
      generateChatId(); // Generate new chatId if none exists
    }
  }, []);

  const generateChatId = () => {
    const newChatId = Math.random().toString(36).substr(2, 9); // Generate random chatId
    localStorage.setItem('chatId', newChatId); // Store chatId in localStorage
    setChatId(newChatId);
    // No need to fetch chat history because it's a new chatId
  };

  const fetchChatHistory = async (chatId) => {
    try {
      const response = await axios.get(`http://localhost:3002/chatHistory/${chatId}`);
      if (response.data && response.data.chatHistory) {
        setMessages(response.data.chatHistory);
      } else {
        setMessages([]);
      }
    } catch (error) {
      console.error('Error fetching chat history:', error);
    }
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSend = async () => {
    if (input.trim()) {
      try {
        const response = await axios.post('http://localhost:3002/sendMessage', {
          chatId: chatId,
          message: input,
        });

        if (response.data && response.data.chatHistory) {
          setMessages(response.data.chatHistory);
        }

      } catch (error) {
        console.error('Error sending message:', error);
      }

      setInput(''); // Clear input field after sending message
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="chatbot-container">
      {isOpen && (
        <div className="chatbot">
          {/* Your chat UI rendering */}
          <div className="chatbot-messages">
            {messages.map((message, index) => (
              <div key={index} className={`chatbot-message ${message.role}`}>
                {message.content}
              </div>
            ))}
          </div>
          <div className="chatbot-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
      <button className="chatbot-toggle" onClick={handleToggle}>
        Toggle Chat
      </button>
    </div>
  );
};

export default Chatbot;
