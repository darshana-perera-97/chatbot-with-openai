import React, { useState } from "react";
import axios from "axios";

const UserForm = ({ chatId, onSubmit }) => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const userName = localStorage.getItem("chatId");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && number) {
      localStorage.setItem("userName", name);
      localStorage.setItem("userNumber", number);
      axios
        .post(`http://localhost:3002/submitUserData`, {
          chatId,
          name,
          number,
        })
        .then(() => {
          if (typeof onSubmit === "function") {
            onSubmit();
          }
        })
        .catch((error) => console.error("Error submitting user data:", error));
    }
  };

  return (
    <div className="container mt-5">
      <div className="">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <p className="text-center mb-5">
              Welcome to chat with Chatbot
            </p>
            <div className="mb-3">
              <input
                type="text"
                className="form-control w-100"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control w-100"
                value={number}
                placeholder="Number"
                onChange={(e) => setNumber(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
