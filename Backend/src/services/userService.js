// Import User model
const User = require('../models/user');

// BCRYPT for password hassing
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// Register a new user

const registerUser = async ({ name, email, password }) => {

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("User with this email already exists");
  }

  const hashPassword = await bcrypt.hash(password, 10);


  const user = await User.create({
    name,
    email,
    password: hashPassword
  })

  return {
    id: user._id,
    name: user.name,
    emai: user.email,
    password: user.password
  }

}





// Login user

const loginUser = async ({ email, password }) => {

  const user = await User.findOne({ email });

  if (!user) throw new Error("Invalid credentials");

  const isPassword = await bcrypt.compare(password, user.password);

  if (!isPassword) throw new Error("Invalid credentials");


  const token = jwt.sign(
    {
      userId: user._id
    },

    process.env.JWT_SECRET,

    {
      expiresIn: "7d"
    }
  )

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    }
  }

}






// Getting user by ID

const getLoginUser = async ({ userId }) => {

  const user = await User.findById(userId ).select("-password");

  if (!user) {
    throw new Error("User not found");
  }

  return {
    id: user._id,
    name: user.name,
    email: user.email,
  };

}




const logoutUser = async () => {

}

module.exports = {
  registerUser,
  loginUser,
  getLoginUser,

}