require("dotenv").config();

const http = require("http");

const connectDB = require("./config/db");
const app = require("./app");

const {
  initializeSocket,
} = require("./config/socket");


// Create HTTP server

const server = http.createServer(app);


// Initialize Socket.IO

initializeSocket(server);


// Connect to MongoDB

connectDB();


// Start server

const PORT = process.env.PORT || 8000;

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});