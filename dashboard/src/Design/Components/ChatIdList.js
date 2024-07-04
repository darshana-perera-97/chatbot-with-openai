import React, { useState, useEffect } from "react";
import { CSVLink } from "react-csv";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const ChatIdList = () => {
  const [userData, setUserData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Simulating fetching data from API
    const fetchUserData = async () => {
      try {
        // Replace with actual API endpoint
        const response = await fetch("http://localhost:3002/viewUserData");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setUserData(data.userData);
        setFilteredData(data.userData); // Initialize filtered data with all user data
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    filterData(searchTerm);
  };

  const filterData = (term) => {
    const filtered = userData.filter(
      (user) =>
        user.chatId.toLowerCase().includes(term.toLowerCase()) ||
        user.name.toLowerCase().includes(term.toLowerCase()) ||
        user.number.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const headers = [
    { label: "Chat ID", key: "chatId" },
    { label: "Name", key: "name" },
    { label: "Number", key: "number" },
  ];

  return (
    <div className="container mt-4">
      <h2>Chat ID List</h2>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Chat ID</th>
            <th scope="col">Name</th>
            <th scope="col">Number</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((user, index) => (
            <tr key={index}>
              <td>{user.chatId}</td>
              <td>{user.name}</td>
              <td>{user.number}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <CSVLink
        data={filteredData}
        headers={headers}
        filename={"chatId_list.csv"}
        className="btn btn-primary"
      >
        Download CSV
      </CSVLink>
    </div>
  );
};

export default ChatIdList;
