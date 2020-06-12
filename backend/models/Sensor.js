const mongoose = require('mongoose');
const { Schema } = mongoose;

const SensorSchema = new Schema({
  name: { type: String, required: true, trim: true },
  deviceId: { type: String, required: true, trim: true },
  dataSets: [
    {
      _id: {
        type: String
      },
      bucket: {
        type: Date,
        trim: true
      }
    }
  ]
});

const Sensor = mongoose.model('Sensor', SensorSchema);

module.exports = Sensor;
