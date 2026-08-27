// Importing required package

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
// const cookieParser = require("cookie")
const morgan = require("morgan");


const app = express();

require("dotenv").config();

// Security middleware
app.use(helmet());



app.use(express.json());

app.use(morgan("dev"));

app.use(express.urlencoded({ extended: true }));





// ==================== Routes Imports ====================







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
// app.use('/user', authRoutes);








module.exports = app;