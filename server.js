const express = require("express");
const rateLimiter = require("express-rate-limit");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://127.0.0.1:3000", credentials: true }));

const limiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
// app.use(limiter);
app.use("/auth", authRoute);
app.use("/user", userRoute);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
