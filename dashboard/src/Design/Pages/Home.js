import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Sidebar from "../Layouts/Sidebar";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Home = () => {
  // Define state variables for card data and chart data
  const [cardData, setCardData] = useState([
    { title: "Input Rate", value: 0 },
    { title: "Output Rate", value: 0 },
    { title: "Input Amount", value: 0 },
    { title: "Output Amount", value: 0 },
  ]);

  const [chartData, setChartData] = useState({
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Dataset 1",
        fill: false,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        data: [65, 59, 80, 81, 56, 55, 40],
      },
      {
        label: "Dataset 2",
        fill: false,
        backgroundColor: "rgba(153,102,255,0.4)",
        borderColor: "rgba(153,102,255,1)",
        data: [45, 79, 60, 91, 76, 85, 60],
      },
    ],
  });

  // Example useEffect to update card data (this can be replaced with actual data fetching logic)
  useEffect(() => {
    // Simulate data fetching
    const fetchedData = [
      { title: "Input Rate", value: 120 },
      { title: "Output Rate", value: 100 },
      { title: "Input Amount", value: 300 },
      { title: "Output Amount", value: 250 },
    ];

    setCardData(fetchedData);
  }, []);

  return (
    <div className="d-flex">
      <Sidebar data="/home" />
      <Container fluid className="content-container">
        <div className="content">
          <Row>
            {cardData.map((card, index) => (
              <Col key={index} md={3}>
                <Card>
                  <Card.Body>
                    <Card.Title>{card.title}</Card.Title>
                    <Card.Text>{card.value}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <Row>
            <Col md={6}>
              <Line data={chartData} />
            </Col>
            <Col md={6}>
              <Line data={chartData} />
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default Home;
