import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../config"; 
import {
  Navbar,
  Nav,
  Button,
  Offcanvas,
  Tab,
  Row,
  Col,
  Form,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./MobileApp.css"; // Import custom CSS for additional styling
import Menu from "./Assets/menu.png";
import Home from "./Assets/home.png";

const MobileApp = () => {
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
  const [showChatList, setShowChatList] = useState(false);

  useEffect(() => {
    const fetchAllChatHistories = async () => {
      try {
        const response = await axios.get(
          "${config.apiBaseUrl}allChatHistory"
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
        `${config.apiBaseUrl}sendMessagebot`,
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
        `${config.apiBaseUrl}sendMessagebotend`,
        {
          chatId: activeChatId,
          message: "",
        }
      );

      setNewMessage("");
      setControlActive(true);
    } catch (error) {
      console.error("Error sending message to botend:", error);
    }
  };

  const handleSendMessageBotstart = async () => {
    try {
      const response = await axios.post(
        `${config.apiBaseUrl}sendMessagebotstart`,
        {
          chatId: activeChatId,
          message: "",
        }
      );

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
      const response = await axios.get(`${config.apiBaseUrl}viewUserData`);
      setUserData(response.data);
      console.log(userData.userData[0].name);
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

  const handleSelectChat = (chatId) => {
    setActiveChatId(chatId);
    setShowChatList(false);
  };

  return (
    <div className="mobileApp">
      <Navbar bg="light" expand="lg" fixed="top">
        <div>
          {/* <i className="fas fa-bars"></i> */}
          <img
            src={Menu}
            onClick={() => setShowChatList(true)}
            height="30px"
            style={{ marginLeft: "5px" }}
          />
          <img
            src={Home}
            onClick={() => setShowChatList(true)}
            height="30px"
            style={{ marginLeft: "5px" }}
          />
        </div>
        <Navbar.Brand className="mx-auto">Chat Agent App</Navbar.Brand>
      </Navbar>

      <Offcanvas show={showChatList} onHide={() => setShowChatList(false)}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Chat List</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav variant="pills" className="flex-column">
            {chatHistories.map((chatHistory, index) => (
              <Nav.Item key={index}>
                <Nav.Link onClick={() => handleSelectChat(chatHistory.chatId)}>
                  {userData.userData[index]?.name || "Unknown"}
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>

      <div className="container mt-5 pt-4">
        <Tab.Container activeKey={activeChatId}>
          <Row>
            <Col>
              <Tab.Content>
                {chatHistories.map((chatHistory, index) => (
                  <Tab.Pane eventKey={chatHistory.chatId} key={index}>
                    <div className="chat-container">
                      <h4>
                        Chats for {userData.userData[index]?.name || "Unknown"}{" "}
                        | {userData.userData[index]?.number || "N/A"}
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
                              onChange={(e) => setNewMessage(e.target.value)}
                            />
                          )}
                          {!controlActive && (
                            <div className="center">
                              <Button
                                variant="info"
                                className="ml-2 control"
                                onClick={handleSendMessageBotend}
                              >
                                Get Control
                              </Button>
                            </div>
                          )}
                          {controlActive && (
                            <Button
                              variant="info"
                              className="ml-2 control"
                              onClick={handleSendMessageBotstart}
                            >
                              Automate
                            </Button>
                          )}
                          {controlActive && (
                            <Button variant="primary" type="submit">
                              Send
                            </Button>
                          )}
                        </div>
                      </Form.Group>
                    </Form>
                  </Tab.Pane>
                ))}
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    </div>
  );
};

export default MobileApp;
