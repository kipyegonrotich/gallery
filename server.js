// Dependencies
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('./_config');
const bodyParser = require('body-parser');

// Routes
const index = require('./routes/index');
const image = require('./routes/image');

// Initialize app
const app = express();

// Database connection 
const MONGODB_URI = process.env.MONGODB_URI || config.mongoURI[app.settings.env];

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
},(err)=>{
    if (err) {
        console.log(err)
    }else{
        console.log(`Connected to Database: ${MONGODB_URI}`)
    }
});
// test if the database has connected successfully


// View engine
app.set('view engine', 'ejs');

// Set up the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Handles form submissions

// Routes
app.use('/', index);
app.use('/image', image);

// Render port configuration
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server is listening at http://localhost:${PORT}`);
});

module.exports = app;
