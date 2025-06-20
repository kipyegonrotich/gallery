const express = require('express');
const router = express.Router();
const uuid = require('uuid');
let upload = require('./upload');
const url = require('url');
let Image = require('../models/images');

router.get('/', async (req, res) => {
  try {
    const images = await Image.find({});
    res.render('index', { images: images, msg: req.query.msg });
  } catch (err) {
    console.error('Error fetching images:', err);
    res.status(500).send('Internal Server Error');
  }
});
