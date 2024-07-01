import React, { useState, useEffect } from "react";
import axios from "axios";
import { Tab, Nav, Row, Col, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const ChatList = () => {
  const [chatHistories, setChatHistories] = useState([]);
  const [userData, setUserData] = useState({
    userData: [
      {
        chatId: null,
        name: "",
        number: "",
      },
    ],
  });
  const [newMessage, setNewMessage] = useState("");
  const [activeChatId, setActiveChatId] = useState(
    localStorage.getItem("activeChatId") || ""
  );
  const [controlActive, setControlActive] = useState(false);
  const [controlState, setControlState] = useState({});

  useEffect(() => {
    const fetchAllChatHistories = async () => {
      try {
        const response = await axios.get(
          "https://chatbot-backend-6ech.onrender.com/allChatHistory"
        );
        setChatHistories(response.data.chatHistories);
        if (response.data.chatHistories.length > 0 && !activeChatId) {
          setActiveChatId(response.data.chatHistories[0].chatId);
        }
      } catch (error) {
        console.error("Error fetching chat histories:", error);
      }
    };

    fetchAllChatHistories();

    const interval = setInterval(() => {
      fetchAllChatHistories();
    }, 3000);

    return () => clearInterval(interval);
  }, [activeChatId]);

  useEffect(() => {
    if (activeChatId) {
      localStorage.setItem("activeChatId", activeChatId);
    }
  }, [activeChatId]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    if (controlState[activeChatId]) {
      // If control is active, only add the user message without sending to backend
      setChatHistories((prevChatHistories) =>
        prevChatHistories.map((chatHistory) =>
          chatHistory.chatId === activeChatId
            ? {
                ...chatHistory,
                messages: [
                  ...chatHistory.messages,
                  { role: "user", content: newMessage },
                ],
              }
            : chatHistory
        )
      );
      setNewMessage("");
    } else {
      await sendMessageToBot(newMessage);
    }
  };

  const sendMessageToBot = async (message) => {
    try {
      const response = await axios.post(
        `https://chatbot-backend-6ech.onrender.com/sendMessagebot`,
        {
          chatId: activeChatId,
          message: message,
        }
      );

      const updatedChatHistory = response.data.chatHistory;
      setChatHistories((prevChatHistories) =>
        prevChatHistories.map((chatHistory) =>
          chatHistory.chatId === activeChatId
            ? { ...chatHistory, messages: updatedChatHistory }
            : chatHistory
        )
      );
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleSendMessageBotend = async () => {
    try {
      const response = await axios.post(
        `https://chatbot-backend-6ech.onrender.com/sendMessagebotend`,
        {
          chatId: activeChatId,
          message: "",
        }
      );

      // Assuming the response from the backend contains updated chat history

      setNewMessage("");
      setControlActive(true);
    } catch (error) {
      console.error("Error sending message to botend:", error);
    }
  };

  const handleSendMessageBotstart = async () => {
    try {
      const response = await axios.post(
        `https://chatbot-backend-6ech.onrender.com/sendMessagebotstart`,
        {
          chatId: activeChatId,
          message: "",
        }
      );

      // Assuming the response from the backend contains updated chat history

      setNewMessage("");
      setControlActive(false);
    } catch (error) {
      console.error("Error sending message to botend:", error);
    }
  };

  const handleGetControl = (chatId) => {
    setControlState((prevControlState) => ({
      ...prevControlState,
      [chatId]: !prevControlState[chatId],
    }));
  };

  // Function to call the new API and log the response
  const callNewAPI = async () => {
    try {
      const response = await axios.get(`https://chatbot-backend-6ech.onrender.com/viewUserData`);
      setUserData(response.data); // Assuming response.data is the user data object
      console.log(userData.userData[0].name);
    } catch (error) {
      console.error("Error fetching data from viewUserData API:", error);
    }
  };

  // Call the API function every 1 second when component mounts
  useEffect(() => {
    const interval = setInterval(() => {
      callNewAPI();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className="container"></div>
      <div className="container mt-5">
        <div className="chat-list">
          <h2>All Chat Histories ( {userData.userData.length} )</h2>
          <Tab.Container
            id="left-tabs-example"
            activeKey={activeChatId}
            onSelect={(k) => setActiveChatId(k)}
          >
            <Row>
              <Col sm={3}>
                <Nav variant="pills" className="flex-column">
                  {chatHistories.map((chatHistory, index) => (
                    <Nav.Item key={index}>
                      <Nav.Link eventKey={chatHistory.chatId}>
                        {userData.userData[index].name}
                      </Nav.Link>
                    </Nav.Item>
                  ))}
                </Nav>
              </Col>
              <Col sm={9}>
                <div>
                  <Tab.Content>
                    {chatHistories.map((chatHistory, index) => (
                      <Tab.Pane eventKey={chatHistory.chatId} key={index}>
                        <div className="chat-container">
                          <h4>
                            Chats for {userData.userData[index].name} |{" "}
                            {userData.userData[index].number}
                          </h4>
                          <div className="scrollable-container">
                            <ul className="chat-messages">
                              {chatHistory.messages.map((message, index) => (
                                <li
                                  key={index}
                                  className={`message-container ${message.role}`}
                                >
                                  <div className={`message ${message.role}`}>
                                    {message.content}
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        <Form
                          onSubmit={handleSendMessage}
                          className="send-message-form"
                        >
                          <Form.Group controlId="formMessage">
                            <div className="d-flex">
                              {controlActive && (
                                <Form.Control
                                  type="text"
                                  placeholder="Type a message..."
                                  value={newMessage}
                                  onChange={(e) =>
                                    setNewMessage(e.target.value)
                                  }
                                />
                              )}
                              {!controlActive && (
                                <Button
                                  variant="info"
                                  className="ml-2 control"
                                  onClick={handleSendMessageBotend}
                                >
                                  Get Control
                                </Button>
                              )}
                              {controlActive && (
                                <Button
                                  variant="info"
                                  className="ml-2 control"
                                  onClick={handleSendMessageBotstart}
                                >
                                  Auto Reply
                                </Button>
                              )}
                              {controlActive && (
                                <Button
                                  variant="primary"
                                  type="submit"
                                  onClick={() => setControlActive(true)}
                                >
                                  Send
                                </Button>
                              )}
                            </div>
                          </Form.Group>
                        </Form>
                      </Tab.Pane>
                    ))}
                  </Tab.Content>
                </div>
              </Col>
            </Row>
          </Tab.Container>
        </div>
      </div>
    </div>
  );
};

export default ChatList;
