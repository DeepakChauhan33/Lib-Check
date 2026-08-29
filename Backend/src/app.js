// Importing required package

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");


const app = express();

require("dotenv").config();

// Security middleware
app.use(helmet());

app.use(cookieParser());

app.use(express.json());

app.use(morgan("dev"));

app.use(express.urlencoded({ extended: true }));




// ==================== Routes Imports ====================
const userRoutes = require("./routes/userRoutes")
const statusRoutes = require("./routes/statusRoutes")




// Allow requests from the frontend
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);




app.get('/', (req, res) => {
  res.send("Hello")
})




// Auth Routes
app.use('/user', userRoutes);

// Report Routes
app.use('/report', statusRoutes);








module.exports = app;