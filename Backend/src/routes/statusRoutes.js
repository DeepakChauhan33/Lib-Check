  const express = require("express");

const router = express.Router();

// Import controllers
const { createStatus, getStatus, getReports } = require('../controller/statusController');

// Import Auth Middleware
const { authMiddleware } = require("../middleware/authMiddleware");


router.post("/", authMiddleware, createStatus);

router.get("/", authMiddleware, getStatus);

router.get("/reports", authMiddleware, getReports);



module.exports = router;