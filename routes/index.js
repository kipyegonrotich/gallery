const express = require('express');
const router = express.Router();
const Image = require('../models/images');

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

module.exports = router;
