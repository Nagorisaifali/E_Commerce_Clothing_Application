// /config/multer.config.js
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinary.config');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'clothprint',
    allowedFormats: ['jpg', 'png'], // note: 'allowedFormats' with capital F
  },
});

const upload = multer({ storage });

module.exports = upload;


