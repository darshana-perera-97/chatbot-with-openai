import React, { useEffect, useState } from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import Sidebar from "../Layouts/Sidebar";
import { Line } from "react-chartjs-2";
import "bootstrap/dist/css/bootstrap.min.css";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AnalyticsCard = ({ title, value }) => {
  return (
    <Col md={3} className="text-center">
      <Card className="mb-4 pt-3 customCard">
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text className="fs-1">{value}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

const Home = () => {
  const [analyticsData, setAnalyticsData] = useState({
    numberOfContacts: 0,
    numberOfMessagesSent: 0,
    numberOfChatIds: 0,
    numberOfManualMessagesEnabledChats: 0,
  });

  const [chartData1, setChartData1] = useState({
    labels: [],
    datasets: [],
  });
  const [chartData2, setChartData2] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    // Fetch analytics data from the API
    const fetchAnalyticsData = async () => {
      try {
        const response = await fetch("http://localhost:3002/analytics"); // Adjust the URL to your API endpoint
        const data = await response.json();
        console.log("Fetched Data:", data); // Add console log to check the data
        setAnalyticsData(data.analytics);

        // Example chart data with weekdays
        const weekdays = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];

        const chart1Data = {
          labels: weekdays,
          datasets: [
            {
              label: "Dataset 1",
              data: [10, 20, 30, 40, 50, 60, 70],
              fill: false,
              backgroundColor: "rgba(75,192,192,1)",
              borderColor: "rgba(75,192,192,1)",
            },
          ],
        };

        const chart2Data = {
          labels: weekdays,
          datasets: [
            {
              label: "Dataset 2",
              data: [70, 60, 50, 40, 30, 20, 10],
              fill: false,
              backgroundColor: "rgba(153,102,255,1)",
              borderColor: "rgba(153,102,255,1)",
            },
          ],
        };

        setChartData1(chart1Data);
        setChartData2(chart2Data);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      }
    };

    fetchAnalyticsData();
  }, []);

  return (
    <div className="d-flex">
      <Sidebar data="/home" />
      <Container fluid className="content-container">
        <div className="content analytics">
          <Row>
            <Col md={12}>
              <h2 className="mt-3 mb-4">Chatbot Analytics</h2>
            </Col>
            <AnalyticsCard
              title="Number of Contacts"
              value={analyticsData.numberOfContacts}
            />
            <AnalyticsCard
              title="Messages Sent"
              value={analyticsData.numberOfMessagesSent}
            />
            <AnalyticsCard
              title="Chat IDs Available"
              value={analyticsData.numberOfChatIds}
            />
            <AnalyticsCard
              title="Manual Messages Enabled"
              value={analyticsData.numberOfManualMessagesEnabledChats}
            />
          </Row>
          <Row>
            <Col md={6}>
              <Card className="mb-4">
                <Card.Body>
                  <Card.Title>Used AI Chats</Card.Title>
                  <Line data={chartData1} />
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="mb-4">
                <Card.Body>
                  <Card.Title>Chart 2</Card.Title>
                  <Line data={chartData2} />
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
