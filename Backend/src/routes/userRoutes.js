const express = require('express');
const router = express.Router();

// Import controllers
const { register, login, getUser, logout } = require('../controller/UserController');

// Import Auth Middleware
const { authMiddleware } = require("../middleware/authMiddleware");


router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout)

// Private route
router.get("/me", authMiddleware, getUser);


module.exports = router;