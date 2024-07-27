import { useState, useEffect } from "react";
import socket from "../socket";
import Stock from "./Stock";
import "./dashboard.css";

function Dashboard({ user }) {
  const [stocks] = useState(["GOOG", "TSLA", "AMZN", "META", "NVDA"]);
  const [subscribedStocks, setSubscribedStocks] = useState([]);
  const [prices, setPrices] = useState({});

  useEffect(() => {
    socket.on("priceUpdate", (data) => {
      setPrices((prevPrices) => ({
        ...prevPrices,
        [data.stock]: data.price,
      }));
    });

    return () => {
      socket.off("priceUpdate");
    };
  }, []);

  const subscribeToStock = (stock) => {
    setSubscribedStocks([...subscribedStocks, stock]);
    socket.emit("subscribe", stock);
  };

  let username = "";
  for (let i = 0; i < user.length; i++) {
    if (user[i] !== "@") {
      username += user[i];
    } else {
      break;
    }
  }

  return (
    <div>
      <h3 className="heading">Welcome, {username.toUpperCase()}</h3>
      <div className="dashboard">
        <div className="avail-stocks">
          <h3>Available Stocks</h3>
          <div className="stock-btns">
            {stocks.map((stock) => (
              <div key={stock} type="button" className="stock-btn">
                {stock}
                {!subscribedStocks.includes(stock) && (
                  <button onClick={() => subscribeToStock(stock)}>
                    Subscribe
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="subscribed-stocks">
          <h3>Subscribed Stocks</h3>
          <div className="subscribed-stock">
            {subscribedStocks.map((stock) => (
              <Stock key={stock} stock={stock} price={prices[stock]} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
