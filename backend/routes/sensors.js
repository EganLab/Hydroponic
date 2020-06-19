const router = require('express').Router();
// const auth = require('../middleware/auth');
const Sensor = require('../models/Sensor');
// const Tracking = require('../models/Tracking');

// get tracking by minute
// router.get('/minute/:id', async (req, res) => {
//   let deviceId = req.params.id;
//   // TODO need more authorization
//   try {
//     const sensorData = await Sensor.find({ deviceId: deviceId });
//     console.log(sensorData);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });

// get tracking by hour
router.get('/hour/:id', async (req, res) => {
  let deviceId = req.params.id;
  // TODO need more authorization
  try {
    const sensorDatas = await Sensor.find({ deviceId: deviceId });

    var allSensorData = [];
    Promise.all(
      sensorDatas.map(sensorData => {
        var temp = {};
        let data = [];
        let time = [];
        temp.name = sensorData.name;
        Promise.all(
          sensorData.dataSets.map(data_hour => {
            data.push(data_hour.data);
            time.push(data_hour.bucket);
            Promise.resolve(true);
          })
        );
        temp.data = data;
        temp.time = time;
        allSensorData.push(temp);
        Promise.resolve(allSensorData);
      })
    );

    res.status(201).json(allSensorData);
  } catch (error) {
    res.status(400).send(error);
  }
});

// get tracking from start
// router.get('/all/:id', async (req, res) => {});

module.exports = router;
