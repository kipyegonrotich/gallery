const express = require('express');
const router = express.Router();
const Image = require('../models/images');
const upload = require('../middleware/upload'); // Adjust path if needed

// GET / route - home page
router.get('/', async (req, res) => {
  try {
    const images = await Image.find({});
    res.render('index', {
      images: images,
      msg: req.query.msg || null
    });
  } catch (err) {
    console.error('Error loading images:', err);
    res.status(500).send('Internal Server Error');
  }
});

// POST /upload - handle image upload
router.post('/upload', (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.redirect(`/?msg=${err}`);
    }

    if (!req.file) {
      return res.redirect('/?msg=Error: No file selected!');
    }

    try {
      const newImage = new Image({
        name: req.file.filename,
        size: req.file.size,
        path: 'images/' + req.file.filename
      });

      await newImage.save();
      res.redirect('/?msg=File uploaded successfully');
    } catch (saveErr) {
      console.error('Error saving image:', saveErr);
      res.redirect('/?msg=Error saving file');
    }
  });
});

module.exports = router;
