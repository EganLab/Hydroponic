const mongoose = require('mongoose');
const { Schema } = mongoose;

const TrackingSchema = new Schema({
  sensorId: { type: String, required: true, trim: true },
  data: [Number],
  created_at: [Date]
});

const Tracking = mongoose.model('Tracking', TrackingSchema);

module.exports = Tracking;
