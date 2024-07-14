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
          {/* Your main content goes here
          asdddddddddddddddddddddddddddddddddddddddddddddddddd */}
          <h2 className="mt-3 mb-4">Test Your Chatbot</h2>
        </div>
      </Container>
      <Chatbot />
    </div>
  );
};

export default Test;
