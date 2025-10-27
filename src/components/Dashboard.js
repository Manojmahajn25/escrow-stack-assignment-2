import React, { useEffect, useState } from "react";
import "./Dashboard.css";

const AVAILABLE_STOCKS = ["GOOG", "TSLA", "AMZN", "META", "NVDA"];

function Dashboard({ email }) {
  const [subscribed, setSubscribed] = useState([]);
  const [prices, setPrices] = useState({});

  // Generate random initial prices
  const generateInitialPrices = () => {
    const init = {};
    AVAILABLE_STOCKS.forEach(
      (stock) => (init[stock] = 1000 + Math.floor(Math.random() * 1000))
    );
    return init;
  };

  // On mount, set random prices
  useEffect(() => {
    setPrices(generateInitialPrices());
  }, []);

  // Update stock prices every second
  useEffect(() => {
    const interval = setInterval(() => {
      setPrices((prev) => {
        const updated = { ...prev };
        subscribed.forEach((stock) => {
          const change = Math.floor(Math.random() * 20 - 10); // random up/down
          updated[stock] = Math.max(0, updated[stock] + change);
        });
        return updated;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [subscribed]);

  const handleSubscribe = (stock) => {
    if (!subscribed.includes(stock)) {
      setSubscribed([...subscribed, stock]);
    }
  };

  return (
    <div className="dashboard">
      <h2>Welcome, {email}</h2>
      <p>📈 Live Stock Prices (auto-refreshing every second)</p>

      <select
        onChange={(e) => handleSubscribe(e.target.value)}
        defaultValue=""
        className="dropdown"
      >
        <option value="" disabled>
          Select stock to subscribe
        </option>
        {AVAILABLE_STOCKS.map((stock) => (
          <option key={stock} value={stock}>
            {stock}
          </option>
        ))}
      </select>

      <div className="cards">
        {subscribed.length === 0 ? (
          <p style={{ marginTop: "20px" }}>Select stocks to view live data</p>
        ) : (
          subscribed.map((stock) => (
            <div className="card" key={stock}>
              <h3>{stock}</h3>
              <p>₹{prices[stock]}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;
