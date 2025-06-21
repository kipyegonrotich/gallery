require('dotenv').config(); 

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('./_config');

// Import routes
const index = require('./routes/index');
const image = require('./routes/image');

const app = express();

// ✅ Updated: Use safe, non-SRV MongoDB URI if not in .env
const fallbackMongoURI = 'mongodb://nixone:MyOneninE@gallery.wc344.mongodb.net:27017/gallery?retryWrites=true&w=majority';
const MONGODB_URI = process.env.MONGODB_URI || fallbackMongoURI;

// ✅ Updated: Remove deprecated options
async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log(`✅ Connected to Database: ${MONGODB_URI}`);
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

// Middleware to parse JSON and URL-encoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use routes
app.use('/', index);
app.use('/image', image);

// Start server (Render requires binding to 0.0.0.0)
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server is listening on port ${PORT}`);
});

module.exports = app;
