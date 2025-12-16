const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

const app = express();
const errorHandler = require('./middleware/errorHandler')
const authRoutes = require("./routes/auth.routes") 

app.set("etag", false);
app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

if (process.env.NODE_ENV !== "test") {
  app.use(morgan("dev"));
}

app.get("/health", (req, res) => {
  return res.status(200).json({ status: "ok", message: "LocalHost API awake" });
});

// Auth routes entry point
app.use("/api/auth",authRoutes);

app.get("/api", (req, res) => {
  return res.json({ message: "Welcome to LocalHost API v1" });
});
app.use((req, res, next) => {
  return res.status(404).json({ message: "Route not found" });
});


app.use(errorHandler);

module.exports = app;
