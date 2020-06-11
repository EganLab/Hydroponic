const mongoose = require('mongoose');
const { Schema } = mongoose;

const SensorDataSchema = new Schema({
  sensorId: { type: String, required: true, trim: true },
  data: [Number],
  created_at: { type: Date, required: true }
});

const SensorData = mongoose.model('SensorData', SensorDataSchema);

module.exports = SensorData;
