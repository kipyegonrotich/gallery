const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

// Import routes
const index = require('./routes/index');
const image = require('./routes/image');

// Use environment variable for MongoDB connection string (fallback is hardcoded example)
const mongodb_url = process.env.MONGODB_URI || 'mongodb+srv://<nixone>:<MyOne@90>@nixipone.mongodb.net/darkroom?retryWrites=true&w=majority';

// Connect to MongoDB
async function connectDB() {
  try {
    await mongoose.connect(mongodb_url);
    console.log('✅ Database connected successfully');
  } catch (err) {
    console.error('❌ Database connection error:', err);
  }
}

connectDB();

// Initialize app
const app = express();

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Serve static files from public folder
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse JSON
app.use(express.json());

// Use routes
app.use('/', index);
app.use('/image', image);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is listening at http://localhost:${PORT}`);
});
