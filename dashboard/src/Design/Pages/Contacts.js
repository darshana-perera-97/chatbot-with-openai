import React from "react";
import { Container } from "react-bootstrap";
import Sidebar from "../Layouts/Sidebar";
import ChatIdList from "../Components/ChatIdList";

const Contacts = () => {
  return (
    <div className="d-flex">
      <Sidebar data="/Contacts" />
      <Container fluid className="content-container">
        <div className="content">
          <ChatIdList />
        </div>
      </Container>
    </div>
  );
};

export default Contacts;
