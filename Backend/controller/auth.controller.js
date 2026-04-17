const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signupUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Fill Your Data",
      });
    }
    //check user if exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    //create User
    const user = await User.create({
      email,
      password: hashedPassword,
    });

    // secret key
    const SECRET_KEY = "SMARTTODO";

    //token Generation
    const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "7d" });

    res.status(201).json({
      success: true,
      message: "User created",
      token
    });
  } catch (err) {
    console.log("signup Err Route :", err);
    res.status(500).json({
      success: false,
      message: "Internal server err",
    });
  }
};

const loginUser = async (req, res) => {};

module.exports = { signupUser, loginUser };
