const mongoose = require('mongoose');
const { Schema } = mongoose;

const ActuatorSchema = new Schema({
  name: { type: String, required: true, trim: true },
  deviceId: { type: String, required: true, trim: true },
  status: { type: String, required: true, trim: true }
});

const Actuator = mongoose.model('Actuator', ActuatorSchema);

module.exports = Actuator;
