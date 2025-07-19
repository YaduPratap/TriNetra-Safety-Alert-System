import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import http from "http";
import { Server as SocketIOServer } from "socket.io";

import AUTH_ROUTER from "./routers/authRouter.js";
import CRIME_ROUTER from "./routers/crimeRouter.js";
import USER_ROUTER from "./routers/userRoutes.js";
import BROADCAST_ROUTER from "./routers/broadcastRouter.js";

dotenv.config();
const app = express();
const server = http.createServer(app); 
const io = new SocketIOServer(server, {
  cors: {
    origin: ['http://localhost:5173', 'http://192.168.35.211:5173', 'http://localhost:5174', 'http://192.168.35.211:5174'],
    credentials: true
  }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://192.168.35.211:5173'],
  credentials: true
}));

const connect = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}`);
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
  }
};

connect();

app.use("/api/auth", AUTH_ROUTER);
app.use("/api/crime", CRIME_ROUTER);
app.use("/api/user", USER_ROUTER);
app.use("/api/broadcast", BROADCAST_ROUTER);

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

export const broadcastMessageToUsers = (messageObj) => {
  io.emit("receiveBroadcast", messageObj); 
};

server.listen(5000, "0.0.0.0", () => {
  console.log("🚀 Server is running on port 5000");
});
