const router = require('express').Router();
// const auth = require('../middleware/auth');
const Actuator = require('../models/Actuator');
const { publishToQueue } = require('../config/rabbitmq');

router.get('/:id', async (req, res) => {
  let deviceId = req.params.id;
  // TODO need more authorization
  try {
    const actuatorData = await Actuator.find({ deviceId });
    publishToQueue('test', 'clod');
    res.status(200).json(actuatorData);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
