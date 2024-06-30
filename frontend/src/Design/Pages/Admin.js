import React, { useState } from "react";
import ChatList from "../ChatIdList";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Admin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = () => {
    // Replace with your actual login logic
    if (username === "a" && password === "a") {
      setIsLoggedIn(true);
    } else {
      setErrorMessage("Invalid credentials");
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Admin Panel
          </a>
        </div>
      </nav>
      <div className="container mt-5">
        {isLoggedIn ? (
          <ChatList />
        ) : (
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-4">
              <div className="card">
                <div className="card-body">
                  <h2 className="text-center">Login</h2>
                  {errorMessage && (
                    <div className="alert alert-danger" role="alert">
                      {errorMessage}
                    </div>
                  )}
                  <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      placeholder="Enter username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="form-group mt-3">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <button
                    className="btn btn-primary btn-block mt-4"
                    onClick={handleLogin}
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
