import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Chat2 = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatId, setChatId] = useState(null);

  useEffect(() => {
    startSession();
  }, []);

  const startSession = async () => {
    try {
      const response = await axios.get('http://localhost:3002/startSession');
      setChatId(response.data.chatId);
    } catch (error) {
      console.error('Error starting session:', error);
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.trim() === '') return;

    const userMessage = input;
    setInput('');
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:3002/sendMessage', {
        chatId,
        message: userMessage,
      });

      setMessages(response.data.chatHistory);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.role}`}>
            <span>{msg.role === 'user' ? 'You: ' : 'Assistant: '}</span>
            {msg.content}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          disabled={isLoading}
          placeholder="Type your message..."
        />
        <button type="submit" disabled={isLoading || input.trim() === ''}>
          Send
        </button>
      </form>
      {isLoading && <div>Loading...</div>}
    </div>
  );
};

export default Chat2;
