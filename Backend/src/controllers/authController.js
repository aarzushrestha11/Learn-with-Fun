const jwt = require("jsonwebtoken");
const User = require("../models/User");




const generateToken = (user) => {
  return jwt.sign({  id: user._id, role: user.role}, process.env.JWT_SECRET, { expiresIn: "30d" });
};


const registerUser = async (req, res) => {
  const { name, email, password, role,profile } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({ name, email, password, role , profile});

    if (user) {
     
      res.status(201).json({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profile:user.profile,
        token: generateToken(user),
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      
      res.json({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profile: user.profile,
        token:generateToken(user)
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }


};
const logout = (req, res) => {
  res.status(200).json({ message: "Logged out successfully." });
};






module.exports = { registerUser, loginUser ,logout };
