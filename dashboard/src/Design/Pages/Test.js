import React from "react";
import { Container } from "react-bootstrap";
import Sidebar from "../Layouts/Sidebar";
import Chatbot from "../Components/Chatbot";

const Test = () => {
  return (
    <div className="d-flex">
      <Sidebar data="/Test" />
      <Container fluid className="content-container">
        <div className="content">
          {/* Your main content goes here */}
          asdddddddddddddddddddddddddddddddddddddddddddddddddd
        </div>
      </Container>
      <Chatbot />
    </div>
  );
};

export default Test;
