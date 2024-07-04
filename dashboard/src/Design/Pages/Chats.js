import React from "react";
import { Container } from "react-bootstrap";
import Sidebar from "../Layouts/Sidebar";
import ChatList from "../Components/ChatList";

const Chats = () => {
  return (
    <div className="d-flex">
      <Sidebar data="/chats" />
      <Container fluid className="content-container">
        <div className="content">
          <ChatList />
        </div>
      </Container>
    </div>
  );
};

export default Chats;
