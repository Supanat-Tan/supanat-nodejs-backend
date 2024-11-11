require("dotenv").config();
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

//login users
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    if (!user || !user._id) {
      return res.status(400).json({ error: "User creation failed" });
    }
    //create token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
    console.error(err);
  }
};

//signup users
const signupUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.signup(email, password);

    if (!user || !user._id) {
      return res.status(400).json({ error: "User creation failed" });
    }
    //create token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
    console.error(err);
  }
};

module.exports = { loginUser, signupUser };
