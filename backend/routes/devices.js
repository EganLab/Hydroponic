const router = require('express').Router();
const auth = require('../middleware/auth');
const Device = require('../models/Device');
const Crop = require('../models/Crop');
const Actuator = require('../models/Actuator');
const Sensor = require('../models/Sensor');

router.post('/create/:id', auth, async (req, res) => {
  let cropId = req.params.id;
  // TODO check permision to add Device like is he working in that farm have this crop
  const CropInfo = await Crop.findById({ _id: cropId });

  if (!!CropInfo) {
    try {
      let device = new Device(req.body);
      let deviceData = await device.save();

      await Crop.updateOne(
        { _id: cropId },
        {
          $push: { devices: [{ _id: deviceData._id }] }
        }
      );
      // =======================================================================
      // Add actuator and sensor ===============================================
      // =======================================================================

      // =================================================================
      //   Add Actuator ==================================================
      // =================================================================

      // add Pump
      let pump = {
        name: 'Pump',
        deviceId: deviceData._id,
        status: false
      };

      let actuator = new Actuator(pump);
      let pumpData = await actuator.save();

      await Device.updateOne(
        { _id: deviceData._id },
        {
          $push: { actuators: [{ _id: pumpData._id, name: pumpData.name }] }
        }
      );

      // add Lamp
      let lamp = {
        name: 'Lamp',
        deviceId: deviceData._id,
        status: false
      };
      actuator = new Actuator(lamp);
      let lampData = await actuator.save();

      await Device.updateOne(
        { _id: deviceData._id },
        {
          $push: { actuators: [{ _id: lampData._id, name: lampData.name }] }
        }
      );
      // Can add more actuators

      // =================================================================
      //   Add Sensor ====================================================
      // =================================================================

      // add humidity
      let humidity = {
        name: 'humidity',
        deviceId: deviceData._id
      };
      let sensor = new Sensor(humidity);
      let sensorData = await sensor.save();

      await Device.updateOne(
        { _id: deviceData._id },
        {
          $push: { sensors: [{ _id: sensorData._id, name: sensorData.name }] }
        }
      );

      // add Lamp
      let temperature = {
        name: 'temperature',
        deviceId: deviceData._id
      };
      sensor = new Sensor(temperature);
      let temperatureData = await sensor.save();

      await Device.updateOne(
        { _id: deviceData._id },
        {
          $push: { sensors: [{ _id: temperatureData._id, name: temperatureData.name }] }
        }
      );

      res.status(201).json({
        success: true,
        message: 'Create device successfully'
      });
    } catch (error) {
      res.status(400).send(error);
    }
  } else {
    res.status(400).json({
      success: false,
      message: 'You do not have permission to create a new Crop'
    });
  }
});

router.get('/:id', auth, async (req, res) => {
  let deviceId = req.params.id;
  // TODO need more authorization
  try {
    const DeviceInfo = await Device.findById({ _id: deviceId });

    res.status(200).json(DeviceInfo);
  } catch (error) {
    res.status(400).send(error);
  }
});
module.exports = router;
