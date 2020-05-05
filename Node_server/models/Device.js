const mongoose = require('mongoose');
const { Schema } = mongoose;

// demo
const DeviceSchema = new Schema({
  user_id: { type: String, required: true },
  device_name: { type: String, required: true },
  type: { type: String, required: true },
  status: { type: String, required: true },
  location: { type: String, required: true }
});

const Device = mongoose.model('Device', DeviceSchema);

module.exports = Device;
