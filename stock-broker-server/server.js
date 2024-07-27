const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173", // Update this to the port Vite is using
    methods: ["GET", "POST"],
  },
});

const port = 4000;
const stocks = ["GOOG", "TSLA", "AMZN", "META", "NVDA"];
let stockPrices = {};

// Initialize stock prices
stocks.forEach((stock) => {
  stockPrices[stock] = Math.random() * 1000;
});

// Update stock prices every second and broadcast to subscribed clients
setInterval(() => {
  stocks.forEach((stock) => {
    stockPrices[stock] = stockPrices[stock] + (Math.random() - 0.5) * 10;
    io.to(stock).emit("priceUpdate", { stock, price: stockPrices[stock] });
  });
}, 1000);

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("subscribe", (stock) => {
    socket.join(stock);
    // Send initial stock price on subscription
    socket.emit("priceUpdate", { stock, price: stockPrices[stock] });
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
