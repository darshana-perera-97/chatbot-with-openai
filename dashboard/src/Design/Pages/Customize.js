import React from "react";
import { Container } from "react-bootstrap";
import Sidebar from "../Layouts/Sidebar";

const Customize = () => {
  return (
    <div className="d-flex">
      <Sidebar data="/Customize" />
      <Container fluid className="content-container">
        <div className="content">
          {/* Your main content goes here */}
          <h2 className="mt-3 mb-4">Chatbot Customization</h2>Coming Soon
        </div>
      </Container>
    </div>
  );
};

export default Customize;
