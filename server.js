require('dotenv').config(); 

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('./_config');

// Import routes
const index = require('./routes/index');
const image = require('./routes/image');

<<<<<<< HEAD
// Use environment variable for MongoDB connection string (fallback to example)
const mongodb_url = process.env.MONGODB_URI || 'mongodb+srv://USERNAME:PASSWORD@nixipone.efooc5e.mongodb.net/nickfirstdb?retryWrites=true&w=majority';

// Connect to MongoDB
async function connectDB() {
  try {
    await mongoose.connect(mongodb_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Database connected successfully');
  } catch (err) {
    console.error('❌ Database connection error:', err);
    process.exit(1); // Exit if DB connection fails
  }
}

connectDB();

const app = express();
=======
// Initializing the app
const app = express();

// connecting the database

const MONGODB_URI = process.env.MONGODB_URI || config.mongoURI[app.settings.env]
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true  },(err)=>{
    if (err) {
        console.log(err)
    }else{
        console.log(`Connected to Database: ${MONGODB_URI}`)
    }
});

// test if the database has connected successfully
// let db = mongoose.connection;
// db.once('open', ()=>{
//     console.log('Database connected successfully')
// })


>>>>>>> test

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
<<<<<<< HEAD
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server is listening on port ${PORT}`);
});
=======
app.listen(PORT,() =>{
    console.log(`Server is listening at http://localhost:${PORT}`)
});


module.exports = app;
>>>>>>> test
