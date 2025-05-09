
// /backend/utils/multer.js
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinary.config');

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'clothprint',
    allowed_formats: ['jpg', 'png'],
  },
});

const upload = multer({ storage });
module.exports = upload;
