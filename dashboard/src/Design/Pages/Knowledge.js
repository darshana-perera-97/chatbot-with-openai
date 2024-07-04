import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import Sidebar from "../Layouts/Sidebar";
import axios from "axios"; // Import Axios for HTTP requests

const Knowledge = () => {
  const [textareaContent, setTextareaContent] = useState(
    "Assume that you are Darshana Perera who is the marketing manager of ABC company. And your company is a soap company which produces lix, sunlight. Provide simple short answers"
  ); // State to hold text area content

  const handleChange = (event) => {
    setTextareaContent(event.target.value); // Update state with text area content
  };

  const handleSubmit = async () => {
    try {
      // Make POST request to store text area content
      await axios.post("http://localhost:3002/storeTextareaContent", {
        content: textareaContent,
      });
      alert("Text area content stored successfully!");
    } catch (error) {
      console.error("Error storing text area content:", error);
      alert("Failed to store text area content.");
    }
  };

  return (
    <div className="d-flex">
      <Sidebar data="/Knowledge" />
      <Container fluid className="content-container">
        <div className="content">
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Example Text Area</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={textareaContent}
              onChange={handleChange}
              placeholder="Enter text here..."
            />
          </Form.Group>
          <Button variant="primary" onClick={handleSubmit}>
            Store Text Area Content
          </Button>{" "}
        </div>
      </Container>
    </div>
  );
};

export default Knowledge;
