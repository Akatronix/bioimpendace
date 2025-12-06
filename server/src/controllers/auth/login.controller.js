const jwt = require("jsonwebtoken");

async function loginController(req, res) {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Wrong credentials." });
    }

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(
        { email: email, role: "admin" },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      return res.status(200).json({
        success: true,
        token: token,
        message: "Login successful",
        role: "admin",
      });
    }

    return res.status(401).json({ message: "Invalid email or password." });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
}

module.exports = {
  loginController,
};
