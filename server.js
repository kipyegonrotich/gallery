// Dependencies
const express = require('express');
const bodyParser = require('body-parser'); // optional; express has built-in parsers
const mongoose = require('mongoose');
const path = require('path');
const config = require('./_config');

// Define routes
const index = require('./routes/index');
const image = require('./routes/image');

// Initialize app
const app = express();

// Database connection 
const MONGODB_URI = process.env.MONGODB_URI || config.mongoURI[app.settings.env];

mongoose.connect(MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
  console.log(`Connected to Database: ${MONGODB_URI}`);
})
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1); 
  });
// Optional: stop app if DB connection fails

// View engine
app.set('view engine', 'ejs');

// Set up the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Body parser middleware
app.use(express.json());
app.use('/', index);
app.use('/image', image);
app.use(express.urlencoded({ extended: true })); // Handles form submissions

// Render port configuration
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server is listening at http://localhost:${PORT}`);
});

module.exports = app;
