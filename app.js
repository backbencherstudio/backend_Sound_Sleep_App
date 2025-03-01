const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");

const users = require("./module/users/users.routes");
const soundRoutes = require("./module/sound/audio.routes");
const feedback = require("./module/feedback/feedback.routes")
dotenv.config();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://10.0.2.2:8081",
      "http://localhost:*",
      "http://localhost:58626",
      "http://localhost:61801",
      "http://localhost:50265",
      "http://192.168.40.47:3000",
      "http://192.168.40.47:*",
      process.env.FRONTEND_URL,
      process.env.APP_URL,
    ],
  })
);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/users", users);
app.use("/api/sounds", soundRoutes);
app.use("/api/feedback", feedback)

app.use("/test", (req, res) => {
  res.status(200).json({
    message: "test route",
  });
});

app.use((req, res, next) => {
  res.status(404).json({
    message: "404 route not found",
  });
});

app.use((err, req, res, next) => {
  res.status(500).json({
    message: "500 Something broken!",
    error: err.message,
  });
});

module.exports = app;


// https://chatgpt.com/canvas/shared/67c2a69bf27c8191a6ee7f7b2c43ce2a