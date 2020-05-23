const mongoose = require('mongoose');
const { Schema } = mongoose;

// demo
const TrackingSchema = new Schema({
  user_id: { type: String, required: true },
  device_id: { type: String, required: true },
  result: { type: String, required: true }
});

const Tracking = mongoose.model('Tracking', TrackingSchema);

module.exports = Tracking;
