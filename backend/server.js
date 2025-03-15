import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import fileUpload from "express-fileupload";
import fs from "fs/promises";
import path from "path";
import cookieParser from "cookie-parser";
import http from "http";
import { Server } from "socket.io";
import morgan from "morgan";

import authRoutes from "./routes/authRoutes.js"
import { networkInterfaces } from 'os';
import db from "./config/db.js";


const __dirname = path.resolve();
const app = express();
const server = http.createServer(app);


const PORT = process.env.PORT || 4000; 

const io = new Server(server, {
  cors: {
    origin: process.env.NODE_ENV === "production"
       ? process.env.CLIENT_URL
       : ["http://localhost:5173", "*"],
    methods: ["GET", "POST"],
  },
});


app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.NODE_ENV === "production" 
      ? process.env.CLIENT_URL 
      : ["http://localhost:5173", "*","https://demo-1-jvfw.onrender.com"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "tmp"),
    limits: { fileSize: 100 * 1024 * 1024 }, 
    createParentPath: true,
  })
);
app.use(express.static(path.join(__dirname, "frontend/dist"))); 


app.use("/api/auth", authRoutes);



setTimeout(async () => {
  try {
    await fs.unlink(path.join(__dirname, "tmp", "file.txt"));
  } catch (error) {
    if (error.code !== "ENOENT") {
      console.error(error);
    }
  }
}, 5000);


const userLocations = new Map();


io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);
  
 
  if (userLocations.size > 0) {
    userLocations.forEach((location, userId) => {
      socket.emit("receive-location", {
        id: userId,
        ...location
      });
    });
    console.log(`Sent ${userLocations.size} existing locations to new user ${socket.id}`);
  }
  

  socket.on("send-location", (data) => {

    userLocations.set(socket.id, {
      latitude: data.latitude,
      longitude: data.longitude,
      timestamp: Date.now()
    });
    
   
    io.emit("receive-location", {
      id: socket.id,
      latitude: data.latitude,
      longitude: data.longitude
    });
  });
  
  
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  
    userLocations.delete(socket.id);
    
    io.emit("user-disconnected", socket.id);
  });
});


// function calculateDistance(lat1, lon1, lat2, lon2) {
//   const R = 6371e3; 
//   const φ1 = lat1 * Math.PI/180;
//   const φ2 = lat2 * Math.PI/180;
//   const Δφ = (lat2-lat1) * Math.PI/180;
//   const Δλ = (lon2-lon1) * Math.PI/180;

//   const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
//             Math.cos(φ1) * Math.cos(φ2) *
//             Math.sin(Δλ/2) * Math.sin(Δλ/2);
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

//   return R * c; 
// }


app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});


server.listen(PORT, '0.0.0.0', () => {
  db();
  console.log(`Server is running on port ${PORT}`);
  
  const nets = networkInterfaces();
  let localIP = 'localhost';
  
 
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === 'IPv4' && !net.internal) {
        localIP = net.address;
      }
    }
  }
  
  console.log(`Access from other devices using: http://${localIP}:${PORT}`);
});