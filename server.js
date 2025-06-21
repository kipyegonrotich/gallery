require('dotenv').config(); // Load .env variables

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

// Import routes
const index = require('./routes/index');
const image = require('./routes/image');

const app = express();

// ✅ Use MongoDB URI from environment only
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI is not defined in environment variables.");
  process.exit(1); // Stop app if no URI is found
}

async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log(`✅ Connected to Database`);
  } catch (err) {
    console.error('❌ Database connection error:', err);
    process.exit(1);
  }
}

connectDB();

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Serve static files from public folder
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use routes
app.use('/', index);
app.use('/image', image);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server is listening on port ${PORT}`);
});

module.exports = app;
