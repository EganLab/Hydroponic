const mongoose = require('mongoose');
const md5 = require('md5');
const { Schema } = mongoose;

// demo
const DeviceSchema = new Schema({
  security_code: {
    type: 'String',
    required: true,
    unique: true,
    trim: true
  },
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

DeviceSchema.pre('save', async function(next) {
  // Hash the security_code before saving the device model
  const device = this;
  if (device.isModified('security_code')) {
    device.security_code = md5(device.security_code);
  }
  next();
});

DeviceSchema.statics.findBySecurityCode = async security_code => {
  // Search for a device by security code.
  security_code = md5(security_code);
  const device = await Device.findOne({ security_code });
  if (!device) {
    throw new Error({ error: 'Not found' });
  }

  return device;
};

const Device = mongoose.model('Device', DeviceSchema);

module.exports = Device;
