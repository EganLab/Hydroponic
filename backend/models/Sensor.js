const mongoose = require('mongoose');
const { Schema } = mongoose;

const SensorSchema = new Schema({
  name: { type: String, required: true, trim: true },
  deviceId: { type: String, required: true, trim: true },
  sensorDataId: [
    {
      _id: {
        type: String
      }
    }
  ]
});

const Sensor = mongoose.model('Sensor', SensorSchema);

module.exports = Sensor;
