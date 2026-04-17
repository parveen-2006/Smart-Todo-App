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

    res.status(201).json({
      success: true,
      message: "Registered successful",
    });
  } catch (err) {
    console.log("signup Err Route :", err);
    res.status(500).json({
      success: false,
      message: "Internal server err",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({
        success: false,
        message: "User not Found",
      });
    }

    //payload
    let tokenPayLoad = {
      existingUser,
    };

    // secret key
    const SECRET_KEY = "SMARTTODO";

    //token Generation
    const token = jwt.sign(tokenPayLoad, SECRET_KEY, { expiresIn: "7d" });

    //checking the password
    const isMatch = await bcrypt.compare(password, existingUser.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "invalid password",
      });
    }

    res.status(200).json({
      success: true,
      message: "Login successfully",
      token,
    });
  } catch (err) {
    console.log("Login err route: ", err);
    res.status(400).json({
      success: false,
      message: "login route err",
    });
  }
};

module.exports = { signupUser, loginUser };
