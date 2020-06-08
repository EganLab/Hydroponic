const router = require('express').Router();
// const auth = require('../middleware/auth');
const Actuator = require('../models/Actuator');
const Device = require('../models/Device');
const { publishToQueue } = require('../config/rabbitmqProducter');

// get all actuator of device
router.get('/device/:id', async (req, res) => {
  let deviceId = req.params.id;
  // TODO need more authorization
  try {
    const actuatorData = await Actuator.find({ deviceId: deviceId });
    if (actuatorData.length === 0) {
      res.status(200).json({
        success: false,
        message: 'You do not have permission or have no actuator'
      });
    } else {
      res.status(200).json({
        success: true,
        actuators: actuatorData
      });
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

// get actuator by id
router.get('/:id', async (req, res) => {
  // TODO need more authorization
  try {
    const actuatorData = await Actuator.findById({ _id: req.params.id });
    res.status(200).json(actuatorData);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/control', async (req, res) => {
  // TODO need more authorization
  // Post parameter :  _id , status
  try {
    const actuatorData = await Actuator.findById({ _id: req.body._id });
    const deviceData = await Device.findById({ _id: actuatorData.deviceId });

    const control = JSON.stringify({
      name: actuatorData.name,
      status: req.body.status
    });
    // public to queue
    publishToQueue(deviceData.security_code, control);

    // update to database
    await Actuator.updateOne({ _id: req.body._id }, { status: req.body.status });

    res.status(201).json({
      success: true
    });
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
