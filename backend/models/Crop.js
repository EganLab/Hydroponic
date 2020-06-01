const mongoose = require('mongoose');
const { Schema } = mongoose;

const CropSchema = new Schema({
  name: { type: String, required: true, trim: true },
  plant: { type: String, required: true, trim: true },
  devices: [
    {
      name: {
        type: String,
        trim: true
      }
    }
  ],
  image: { type: String, required: true, trim: true }
  // TODO time
});

const Crop = mongoose.model('Crop', CropSchema);

module.exports = Crop;
