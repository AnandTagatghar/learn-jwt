require("dotenv").config();
const jwt = require("jsonwebtoken");

const authToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token)
    return res
      .status(401)
      .json({ status: "error", statusCode: 401, message: "Unauthorized" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err)
      return res
        .status(403)
        .json({ status: "error", statusCode: 403, message: "Forbidden" });
    req.user = user;
    next();
  });
};

const authorizeRole = (allowedRole) => {
  return (req, res, next) => {
    if (!allowedRole.includes(req.user.role))
      return res.status(403).json({
        status: "error",
        statusCode: 403,
        message: "Forbidden: Insufficient Permissions",
      });

    next();
  };
};

module.exports = { authToken, authorizeRole };
