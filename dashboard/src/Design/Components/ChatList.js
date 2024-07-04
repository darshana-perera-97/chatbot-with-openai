import React, { useState, useEffect } from "react";
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
        const response = await fetch("http://localhost:3002/allChatHistory");
        const data = await response.json();
        setChatHistories(data.chatHistories);
        if (data.chatHistories.length > 0 && !activeChatId) {
          setActiveChatId(data.chatHistories[0].chatId);
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
      const response = await fetch("http://localhost:3002/sendMessagebot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chatId: activeChatId,
          message: message,
        }),
      });
      const data = await response.json();
      const updatedChatHistory = data.chatHistory;
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
      await fetch("http://localhost:3002/sendMessagebotend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chatId: activeChatId,
          message: "",
        }),
      });
      setNewMessage("");
      setControlActive(true);
    } catch (error) {
      console.error("Error sending message to botend:", error);
    }
  };

  const handleSendMessageBotstart = async () => {
    try {
      await fetch("http://localhost:3002/sendMessagebotstart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chatId: activeChatId,
          message: "",
        }),
      });
      setNewMessage("");
      setControlActive(false);
    } catch (error) {
      console.error("Error sending message to botstart:", error);
    }
  };

  const handleGetControl = (chatId) => {
    setControlState((prevControlState) => ({
      ...prevControlState,
      [chatId]: !prevControlState[chatId],
    }));
  };

  const callNewAPI = async () => {
    try {
      const response = await fetch("http://localhost:3002/viewUserData");
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error("Error fetching data from viewUserData API:", error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      callNewAPI();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const filteredUserData = userData.userData.filter(
    (user) => user.name && user.number
  );

  return (
    <div className="container mt-5">
      <div className="chat-list">
        <h2>All Chat Histories ({filteredUserData.length})</h2>
        <Tab.Container
          id="left-tabs-example"
          activeKey={activeChatId}
          onSelect={(k) => setActiveChatId(k)}
        >
          <Row>
            <Col sm={3}>
              <Nav variant="pills" className="flex-column">
                {filteredUserData.map((user) => (
                  <Nav.Item key={user.chatId}>
                    <Nav.Link eventKey={user.chatId}>{user.name}</Nav.Link>
                  </Nav.Item>
                ))}
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                {filteredUserData.map((user) => {
                  const chatHistory = chatHistories.find(
                    (history) => history.chatId === user.chatId
                  );
                  return (
                    <Tab.Pane eventKey={user.chatId} key={user.chatId}>
                      {chatHistory && (
                        <div className="chat-container">
                          <h4>
                            Chats for {user.name} | {user.number}
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
                      )}
                      <Form
                        onSubmit={handleSendMessage}
                        className="send-message-form"
                      >
                        <Form.Group controlId="formMessage">
                          <div className="d-flex">
                            {controlActive ? (
                              <Form.Control
                                type="text"
                                placeholder="Type a message..."
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                              />
                            ) : (
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
                  );
                })}
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    </div>
  );
};

export default ChatList;
