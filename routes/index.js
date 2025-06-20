const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const uuid = require('uuid');
const Image = require('../models/images');

// configure multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, uuid.v4() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

// POST route for uploading image
router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const newImage = new Image({
      name: req.body.name,
      description: req.body.description,
      image: `/uploads/${req.file.filename}`,
    });

    await newImage.save();
    res.redirect('/?msg=Image uploaded successfully');
  } catch (err) {
    console.error(err);
    res.redirect('/?msg=Error uploading image');
  }
});

// Export the router
module.exports = router;
