import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import person from "./Assets/person.png";
import bankLogo from "./Assets/bankLogo.jpg";
import ChatOpen from "./Assets/ChatOpen.png";
import Delete from "./Assets/delete.png";
import UserForm from "./UserForm"; // Import the UserForm component

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [chatId, setChatId] = useState(null);
  const [source, setSource] = useState("");
  const [controlActive, setControlActive] = useState(true); // State to track control status
  const messagesEndRef = useRef(null); // Ref for the chat container
  const [userInfo, setUserInfo] = useState({
    name: localStorage.getItem("userName") || "",
    number: localStorage.getItem("userNumber") || "",
  });
  useEffect(() => {
    const storedChatId = localStorage.getItem("chatId");
    if (storedChatId) {
      setChatId(storedChatId);
      fetchChatHistory(storedChatId);
    } else {
      generateChatId(); // Generate a new chatId if not stored
    }

    const intervalId = setInterval(() => {
      if (chatId) {
        fetchChatHistory(chatId);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, []); // Empty dependency array to run only once on mount

  useEffect(() => {
    if (!userInfo.name || !userInfo.number) {
      return;
    }

    const newChatId = localStorage.getItem("chatId");
    if (newChatId) {
      setChatId(newChatId);
      fetchChatHistory(newChatId);
    } else {
      generateChatId();
    }

    const intervalId = setInterval(() => {
      if (chatId) {
        fetchChatHistory(chatId);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [chatId, userInfo]);

  useEffect(() => {
    if (messages.length > 0) {
      setSource(messages[messages.length - 1].content);

      if (source === "Automate chat continued") {
        setControlActive(false);
      }
      if (source === "Manual chat continued") {
        setControlActive(true);
      }
      console.log(controlActive);
    }
  }, [messages]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const generateChatId = () => {
    const newChatId = Math.random().toString(36).substr(2, 9);
    localStorage.setItem("chatId", newChatId);
    setChatId(newChatId);
    console.log("new" + newChatId);
  };

  const fetchChatHistory = async (chatId) => {
    try {
      const response = await axios.get(
        `http://localhost:3002/chatHistory/${chatId}`
        // `http://localhost:3002/chatHistory/${chatId}`
      );
      if (response.data && response.data.chatHistory) {
        setMessages(response.data.chatHistory);
      } else {
        setMessages([]);
      }
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSend = async () => {
    if (input.trim()) {
      const newMessage = { role: "user", content: input };

      if (controlActive) {
        try {
          const response = await axios.post(
            "http://localhost:3002/sendMessage",
            {
              chatId: chatId,
              message: input,
            }
          );

          if (response.data && response.data.chatHistory) {
            setMessages(response.data.chatHistory);
          }
        } catch (error) {
          console.error("Error sending message:", error);
        }
        setInput("");
      } else {
        try {
          const response = await axios.post(
            "http://localhost:3002/sendMessageuser",
            {
              chatId: chatId,
              message: input,
            }
          );

          if (response.data && response.data.chatHistory) {
            setMessages(response.data.chatHistory);
          }
        } catch (error) {
          console.error("Error sending message:", error);
        }
        setInput("");
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const filterMessages = (messages) => {
    return messages.filter(
      (message) =>
        message.content !== "Manual chat continued" &&
        message.content !== "Automate chat continued"
    );
  };

  const handleFormSubmit = () => {
    setUserInfo({
      name: localStorage.getItem("userName"),
      number: localStorage.getItem("userNumber"),
    });
  };

  return (
    <div className="popup">
      <div className="chatbot-container">
        {isOpen && (
          <div className="chatbot">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px 0px",
              }}
            >
              <img
                src={person}
                height="45px"
                style={{ marginLeft: "15px", marginTop: "5px" }}
              />
              <img src={bankLogo} height="50px" />
            </div>
            <div className="chatbot-messages">
              {!userInfo.name || !userInfo.number ? (
                <UserForm onSubmit={handleFormSubmit} chatId={chatId} />
              ) : (
                <>
                  {filterMessages(messages).map((message, index) => (
                    <div
                      key={index}
                      className={`chatbot-message ${message.role}`}
                    >
                      {message.content}
                    </div>
                  ))}
                  <div ref={messagesEndRef} />{" "}
                </>
              )}
              {/* Empty div for scrolling to bottom */}
            </div>
            {userInfo.name && userInfo.number && (
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
            )}
          </div>
        )}
        <div
          style={{ display: "flex", justifyContent: "end", marginTop: "20px" }}
        >
          <button className="chatbot-toggle" onClick={handleToggle}>
            {isOpen && <img src={Delete} height="40px" />}
            {!isOpen && <img src={ChatOpen} height="60px" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
