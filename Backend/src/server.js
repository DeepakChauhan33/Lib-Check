require('dotenv').config();

// ==================== Imports ====================

const http = require("http");

const connectDB = require("./config/db");
const app = require('./app')



const {
  initializeSocket,
} = require("./config/socket");



// ==================== Create HTTP Server ====================

const server = http.createServer(app);

// ==================== Initialize Socket.IO ====================

initializeSocket(server);





// Connect to MongoDB
connectDB()

const PORT = process.env.PORT

server.listen(PORT, () => {
  console.log(`Running at PORT http://localhost:${PORT}`)
})