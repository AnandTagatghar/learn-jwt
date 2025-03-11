const express = require("express");
const { users } = require("../config/DB");
const { generateAccessToken, generateRefreshToken } = require("../config/auth");
const jwt = require("jsonwebtoken");

const authRoute = express.Router();

const refreshtokens = [];

authRoute.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (!users.find((user) => user.user == username && user.password == password))
    return res
      .status(401)
      .json({ status: "error", statusCode: 401, message: "Unauthorized" });

  const accessToken = generateAccessToken(req.body);
  const refreshToken = generateRefreshToken(req.body);

  refreshtokens.push(refreshToken);

  res.cookie("refreshtoken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });
  res
    .status(200)
    .json({ status: "success", statusCode: 200, token: accessToken });
});

authRoute.post("/refresh", (req, res) => {
  const { refreshtoken } = req.cookies;
  if (!refreshtoken /* || !refreshtokens.includes(refreshtoken) */) {
    return res
      .status(403)
      .json({
        status: "error",
        statusCode: 403,
        message: "Invalid Refresh Token",
      });
  }

  jwt.verify(refreshtoken, process.env.JWT_REFRESH_SECRET, (err, user) => {
    if (err)
      return res
        .status(403)
        .json({ status: "error", statusCode: 403, message: "Invalid token" });

    let accesstoken = generateAccessToken(user);
    res
      .status(200)
      .json({ status: "success", statusCode: 200, token: accesstoken });
  });
});


authRoute.post("/logout", (req, res) => {
  const { refreshtoken } = req.cookies;
  refreshtokens = refreshtokens.filter(token => token != refreshtoken);
  res.clearCookie("refreshtoken");
  res.status(200).json({ status: "success", statusCode: 200, message: `Logged out successfully` });
});

module.exports = authRoute;