import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Sidebar from "../Layouts/Sidebar";

const Profile = () => {
  // Mock profile data
  const profile = {
    name: "John Doe",
    email: "john.doe@example.com",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    interests: ["Web Integrated"],
    avatarUrl: "https://via.placeholder.com/250", // Placeholder image URL
  };

  return (
    <div className="d-flex">
      <Sidebar data="/Profile" />
      <Container fluid className="content-container">
        <div className="content">
          <h2>Profile</h2>
          <Card>
            <Card.Body>
              <Row>
                <Col md={4}>
                  <img
                    src={profile.avatarUrl}
                    alt="Profile"
                    className="img-fluid rounded-circle mb-3 m-1"
                  />
                </Col>
                <Col md={8}>
                  <h3>{profile.name}</h3>
                  <p>{profile.email}</p>
                  <p>{profile.bio}</p>
                  <h5>Chatbot Usage:</h5>
                  <ul>
                    {profile.interests.map((interest, index) => (
                      <li key={index}>{interest}</li>
                    ))}
                  </ul>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {/* Contact Us Section */}
          <Card className="mt-4">
            <Card.Body className="text-center">
              <h3>Contact Us</h3>
              <p>
                If you have any questions or feedback, please feel free to
                contact us at:
              </p>
              <Button variant="primary" href="/">
                Contact Us
              </Button>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </div>
  );
};

export default Profile;
