const express = require("express");
const { authToken, authorizeRole } = require("../middleware/authMiddleware");

const userRoute = express.Router();

userRoute.post("/profile", authToken, (req, res) => {
  res
    .status(200)
    .json({
      status: "success",
      statusCode: 200,
      message: "User profile accessed.",
      user: req.user,
    });
});

userRoute.post("/admin", authToken, authorizeRole(["admin"]), (req, res) => {
  res
    .status(200)
    .json({
      status: "success",
      statusCode: 200,
      message: "Admin access granted.",
      user: req.user,
    });
});

module.exports = userRoute;
