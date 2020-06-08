const mongoose = require('mongoose');
const { Schema } = mongoose;

// demo
const DeviceSchema = new Schema({
  security_code: { type: 'String', required: true, unique: true, lowercase: true, trim: true },
  sensors: [
    {
      sensor: {
        type: String
      },
      name: {
        type: String,
        trim: true
      }
    }
  ],
  actuators: [
    {
      actuator: {
        type: String
      },
      name: {
        type: String,
        trim: true
      }
    }
  ],
  status: { type: Boolean }
});

const Device = mongoose.model('Device', DeviceSchema);

module.exports = Device;
