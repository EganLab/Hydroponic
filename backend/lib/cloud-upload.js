var cloudinary = require('cloudinary').v2;
const config = require('../config/cloudinary');

cloudinary.config(config);

module.exports.imageUpload = async function(file, options = {}) {
  try {
    if (file.path) {
      const result = await cloudinary.uploader.upload(file.path, options);
      return result.url;
    } else if (file) {
      return file;
    } else {
      return 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg';
    }
  } catch (error) {
    return 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg';
  }
};
