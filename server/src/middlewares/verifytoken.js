const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const token = req.header("token");
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    // check for user in the database

    const existingUser = decoded.email === process.env.ADMIN_EMAIL;
    if (!existingUser) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized user." });
    }
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Session expired. Please log in again.",
      });
    }
    return res.status(400).json({
      success: false,
      message: "Invalid token.",
    });
  }
}

module.exports = verifyToken;
