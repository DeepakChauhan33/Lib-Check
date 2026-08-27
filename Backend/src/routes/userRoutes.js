const express = require('express');
const router = express.Router();

// Import controllers
const { register, } = require('../controller/autrhController');


router.post("/register", register);


module.exports = router;