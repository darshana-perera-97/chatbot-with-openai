import React, { useState } from "react";
import axios from "axios";

const UserForm = ({ chatId, onSubmit }) => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && number) {
      localStorage.setItem("userName", name);
      localStorage.setItem("userNumber", number);
      axios
        .post("http://localhost:3002/submitUserData", {
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
    <div className="user-form">
      <form onSubmit={handleSubmit}>
        <p>{chatId}</p>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Number:
          <input
            type="text"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UserForm;
