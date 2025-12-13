require("dotenv").config();
const http = require("http");
const { Server } = require("socket.io");

const app = require("./app");
const { connectDB } = require("./config/db");

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_ORIGIN || "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Store io on app, so routes/controllers can use it later
app.set("io", io);

// Basic Socket.io connection handler (we’ll extend later)
io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id);
  });
});


async function start() {
  try {
    await connectDB();

    server.listen(PORT, () => {
      console.log(`LocalHost API running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err.message);
    process.exit(1);
  }
}

start();
