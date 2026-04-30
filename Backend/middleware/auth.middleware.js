const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res.status(401).json({
        message: "no token , not authorized",
      });
    }
    const SECRET_KEY = "SMARTTODO";
    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, SECRET_KEY);

    req.user = decoded.id;

    // console.log("AUTH HEADER:", req.headers.authorization);
    // console.log("TOKEN:", token);
    // console.log("DECODED:", decoded);
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Token invalid or expired",
    });
  }
};

module.exports = protect;
