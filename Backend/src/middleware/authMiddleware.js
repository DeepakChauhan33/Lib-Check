// Importing user model
const User = require("../models/user");

// Importing Bcrypt and Json web token
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const authMiddleware = async (req, res, next) => {

  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Authentication Required"
      })
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication Required"
      })
    }


    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    )

    req.user = {
      userId: decoded.userId,
    }

    next();

  } catch (error) {

    return res.status(400).json({
      success: false,
      message: error.message,
    });

  }

}


module.exports = {
  authMiddleware
};