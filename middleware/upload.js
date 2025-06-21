const multer = require('multer');
const path = require('path');

// Set up storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// File filter (optional)
function fileFilter(req, file, cb) {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb('Error: File is not an image!', false);
  }
}

const upload = multer({
  storage: storage,
  fileFilter: fileFilter
}).single('image'); // "image" is the field name in your form

module.exports = upload;
