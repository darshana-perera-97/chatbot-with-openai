import React from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import Sidebar from "../Layouts/Sidebar";

const Integrate = () => {
  const cardsData = [
    {
      title: "Website Integration",
      text: "Show Integration",
      link: "/website",
    },
    { title: "WhatsApp Integration", text: "Coming Soon", link: "#" },
    { title: "Messenger Integration", text: "Coming Soon", link: "#" },
    { title: "SMS Chatbot", text: "Coming Soon", link: "#" },
  ];

  return (
    <div className="d-flex">
      <Sidebar data="/Integrate" />
      <Container fluid className="content-container">
        <div className="content">
          <h2 className="mt-3 mb-4">Chatbot Integration</h2>
          <Row>
            {cardsData.map((card, index) => (
              <Col key={index} sm={12} md={6} lg={3} className="mb-4">
                <Card>
                  <Card.Body className="pt-4 pb-4">
                    <Card.Title className="fs-4">{card.title}</Card.Title>
                    <Card.Text className="fs-6 opacity-50">
                      {card.text}
                    </Card.Text>
                    <a href={card.link} className="stretched-link"></a>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default Integrate;
