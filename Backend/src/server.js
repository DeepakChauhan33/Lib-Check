require('dotenv').config();

// ==================== Imports ====================

const connectDB = require("./config/db");
const app = require('./app')


// Connect to MongoDB
connectDB()

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Running at PORT http://localhost:${PORT}`)
})