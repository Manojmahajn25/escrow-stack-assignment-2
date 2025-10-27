import React, { useState } from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";

function App() {
  const [email, setEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (email.trim() !== "") {
      setIsLoggedIn(true);
    } else {
      alert("Please enter your email");
    }
  };

  return (
    <div className="container">
      {!isLoggedIn ? (
        <div className="login-box">
          <h2>Stock Broker Dashboard</h2>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Login</button>
          </form>
        </div>
      ) : (
        <Dashboard email={email} />
      )}
    </div>
  );
}

export default App;
