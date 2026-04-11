const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');

const chatRoute = require('../routes/chat');
const careerRoute = require('../routes/carrer');
const studentRoute = require('../routes/studentRoute');
const authRoutes = require('../routes/authRoute');

const app = express();

// CORS (important for Vercel)
app.use(cors({
  origin: "*", // or your frontend URL
  credentials: true
}));

app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'API is running!' });
});

app.use('/api/chat', chatRoute);
app.use('/api/career', careerRoute);
app.use('/api/auth', authRoutes);
app.use('/api/student', studentRoute);

// MongoDB connection (important: connect once)
let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;
  const db = await mongoose.connect(process.env.MONGO_URI);
  isConnected = db.connections[0].readyState;
  console.log("MongoDB Connected");
};

// Middleware to ensure DB connection
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

module.exports = app;