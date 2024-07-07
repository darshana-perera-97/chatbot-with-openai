import React from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import Sidebar from "../Layouts/Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  return (
    <div className="d-flex">
      <Sidebar data="/home" />
      <Container fluid className="content-container">
        <div className="content">
          <Row>
            <Col md={3}>
              <Card className="mb-4">
                <Card.Body>
                  <Card.Title>Card Title 1</Card.Title>
                  <Card.Text>Analytics data for card 1</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="mb-4">
                <Card.Body>
                  <Card.Title>Card Title 2</Card.Title>
                  <Card.Text>Analytics data for card 2</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="mb-4">
                <Card.Body>
                  <Card.Title>Card Title 3</Card.Title>
                  <Card.Text>Analytics data for card 3</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="mb-4">
                <Card.Body>
                  <Card.Title>Card Title 4</Card.Title>
                  <Card.Text>Analytics data for card 4</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default Home;
