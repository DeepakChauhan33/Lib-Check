
const { registerUser, loginUser, getLoginUser, logoutUser } = require("../services/userService")



// Regestrating new user
const register = async (req, res) => {

  try {

    const user = await registerUser(req.body);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
    });

  } catch (error) {

    return res.status(400).json({
      success: false,
      message: error.message
    });

  }
}




// Login user
const login = async (req, res) => {
  try {
    const result = await loginUser(req.body);

    return res.status(200).json({
      success: true,
      message: "User login successfully",
      token: result.token,
      user: result.user,
    });

  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};






// // Get the currently authenticated user

const getUser = async (req, res) => {

  try {

    const user = await getLoginUser(req.user);

    return res.status(200).json({
      success: true,
      message: "Authenticated successfully",
      user
    })

  } catch (error) {

    return res.status(400).json({
      success: false,
      message: error.message
    });

  }
}





// User Logout

const logout = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: "Logout Successful, Frontend have to call this route and remove stored JWT token"
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
}





// ---------------------------

module.exports = {
  register,
  login,
  getUser,
  logout

}