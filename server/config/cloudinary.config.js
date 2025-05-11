
// /backend/utils/cloudinary.js
const cloudinary = require('cloudinary').v2;

<<<<<<< HEAD

cloudinary.config({ 
  cloud_name: process.env.CLOUDE_NAME,
  api_key: process.env.CLOUDE_KEY,
  api_secret: process.env.CLOUDE_SECRET , 
=======
cloudinary.config({
  cloud_name: process.env.CLOUDE_NAME,
  api_key: process.env.CLOUDE_KEY,
  api_secret: process.env.CLOUDE_SECRET, 
>>>>>>> 0d84b22c1acd5a7faa8dd261896e692aee1e4705
});

module.exports = cloudinary;

