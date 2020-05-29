const mongoose = require('mongoose');
const { Schema } = mongoose;

const FarmSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  crops: [
    {
      crop: {
        type: String
      }
    }
  ],
  location: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    trim: true
  },
  supervisor: {
    type: String,
    trim: true
  },
  staffs: [
    {
      staff: {
        type: String,
        trim: true
      },
      name: {
        type: String,
        trim: true
      }
    }
  ]
});

const Farm = mongoose.model('Farm', FarmSchema);

module.exports = Farm;
