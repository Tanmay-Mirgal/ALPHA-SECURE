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
import cron from "node-cron";
import nodemailer from "nodemailer";
import { networkInterfaces } from "os";
import db from "./config/db.js";
import User from "./models/userModel.js"; // Import User Model

import authRoutes from "./routes/authRoutes.js";
import stockRoutes from "./routes/stockRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import kycRoutes from "./routes/kycRoutes.js";

const __dirname = path.resolve();
const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 4000;

const io = new Server(server, {
  cors: {
    origin: process.env.NODE_ENV === "production" ? process.env.CLIENT_URL : ["http://localhost:5173", "*"],
    methods: ["GET", "POST"],
  },
});

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.NODE_ENV === "production" ? process.env.CLIENT_URL : ["http://localhost:5173", "*", "https://demo-1-jvfw.onrender.com"],
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
app.use("/api/stocks", stockRoutes);
app.use("/api/transaction", transactionRoutes);
app.use("/api/kyc", kycRoutes);

setTimeout(async () => {
  try {
    await fs.unlink(path.join(__dirname, "tmp", "file.txt"));
  } catch (error) {
    if (error.code !== "ENOENT") {
      console.error(error);
    }
  }
}, 5000);

// Dummy stock data (Simulated)
let stocks = [
  { name: "RELIANCE", price: 2700.5, change: 0, percentChange: 0 },
  { name: "TCS", price: 3500.75, change: 0, percentChange: 0 },
  { name: "INFY", price: 1450.2, change: 0, percentChange: 0 },
  { name: "HDFC", price: 2850.9, change: 0, percentChange: 0 },
  { name: "ICICIBANK", price: 920.6, change: 0, percentChange: 0 },
  { name: "SBIN", price: 620.4, change: 0, percentChange: 0 },
  { name: "HCLTECH", price: 1305.2, change: 0, percentChange: 0 },
  { name: "BAJFINANCE", price: 7150.3, change: 0, percentChange: 0 },
  { name: "TATAMOTORS", price: 520.6, change: 0, percentChange: 0 },
  { name: "SUNPHARMA", price: 1170.8, change: 0, percentChange: 0 },
];

// Function to update stock prices randomly
const updateStockPrices = () => {
  stocks = stocks.map(stock => {
    const change = (Math.random() * 20 - 10).toFixed(2);
    const newPrice = (stock.price + parseFloat(change)).toFixed(2);
    return {
      ...stock,
      price: parseFloat(newPrice),
      change: parseFloat(change),
      percentChange: ((change / stock.price) * 100).toFixed(2),
    };
  });
};

// Email transporter setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Function to fetch all user emails & send stock updates
const sendStockEmail = async () => {
  updateStockPrices();

  try {
    const users = await User.find({}, "email");
    if (!users.length) {
      console.log("❌ No users found in the database.");
      return;
    }

    const recipientEmails = users.map(user => user.email);

    const emailContent = `
      <h2>📊 Nifty 50 Stock Updates (Simulated) 📈</h2>
      <table border="1" cellpadding="5" cellspacing="0" style="border-collapse: collapse;">
        <tr>
          <th>Stock</th>
          <th>Price (INR)</th>
          <th>Change</th>
          <th>% Change</th>
        </tr>
        ${stocks
          .map(
            (stock) => `
          <tr>
            <td>${stock.name}</td>
            <td>${stock.price}</td>
            <td style="color: ${stock.change >= 0 ? "green" : "red"}">${stock.change}</td>
            <td style="color: ${stock.percentChange >= 0 ? "green" : "red"}">${stock.percentChange}%</td>
          </tr>
        `
          )
          .join("")}
      </table>
      <p>Last Updated: ${new Date().toLocaleString("en-IN")}</p>
    `;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: recipientEmails,
      subject: "📊 Nifty 50 Real-Time Stock Updates",
      html: emailContent,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Stock update email sent successfully to ${recipientEmails.length} users!`);
  } catch (error) {
    console.error("❌ Error sending stock email:", error);
  }
};

// Run cron job every 1 minute
cron.schedule("0 * * * *", async () => {
  console.log("⏳ Running stock email job...");
  await sendStockEmail();
});


// Live location tracking with Socket.IO
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

app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

// Start server
server.listen(PORT, "0.0.0.0", () => {
  db();
  console.log(`🚀 Server running on port ${PORT}`);

  const nets = networkInterfaces();
  let localIP = "localhost";
  
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === "IPv4" && !net.internal) {
        localIP = net.address;
      }
    }
  }
  
  console.log(`🌍 Access from other devices using: http://${localIP}:${PORT}`);
});
