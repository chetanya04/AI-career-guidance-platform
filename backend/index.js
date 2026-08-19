const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');

const chatRoute = require('../routes/chat');
const careerRoute = require('../routes/carrer');
const studentRoute = require('../routes/studentRoute');
const authRoutes = require('../routes/authRoute');

const app = express();

app.use(cors({
  origin: "*",
  credentials: true
}));

app.use(express.json());

// MongoDB connection
let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;

  const db = await mongoose.connect(process.env.MONGO_URI);
  isConnected = db.connections[0].readyState;

  console.log("MongoDB Connected");
};

// DB middleware — BEFORE routes
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("Database connection failed:", error);
    res.status(500).json({ message: "Database connection failed" });
  }
});

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'API is running!' });
});

// Routes
app.use('/api/chat', chatRoute);
app.use('/api/career', careerRoute);
app.use('/api/auth', authRoutes);
app.use('/api/student', studentRoute);

module.exports = app;
