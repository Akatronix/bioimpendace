const express = require("express");
const { loginController } = require("../controllers/auth/login.controller");
const {
  createController,
  updateController,
  getController,
} = require("../controllers/sensor.controller");
const verifyToken = require("../middlewares/verifytoken");

const router = express.Router();

router.post("/login", loginController);

router.post("/create", createController);
router.get("/getData/:id", verifyToken, getController);
router.put("/update/:id", updateController);

module.exports = router;
