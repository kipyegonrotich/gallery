const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

let index = require('./routes/index');
let image = require('./routes/image');

// Use the MONGODB_URI environment variable or fallback to local MongoDB
const mongodbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/darkroom';

async function connectDB() {
  try {
    await mongoose.connect(mongodbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connected successfully');
  } catch (err) {
    console.error('Database connection error:', err);
  }
}

connectDB();

const app = express();

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

app.use('/', index);
app.use('/image', image);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});
