const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const chatRoute = require('./routes/chat')
const careerRoute= require('./routes/carrer')
const studentRoute= require('./routes/studentRoute')

const corsOptions = {
  origin: "http://localhost:3000", 
  credentials: true,               
};
app.use(cors(corsOptions));

// Body parser middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'EV Charging Station API is running!' });
});
app.use('/api/chat', chatRoute);

const authRoutes = require('./routes/authRoute');
app.use('/api/career', careerRoute);
app.use('/api/auth', authRoutes);
app.use("/api/student", studentRoute);

// Database connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 5000;  
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;