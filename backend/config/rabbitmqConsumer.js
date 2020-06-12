var amqp = require('amqplib/callback_api');
const Sensor = require('../models/Sensor');
const Device = require('../models/Device');
const SensorData = require('../models/SensorData');

module.exports = function(cb) {
  amqp.connect('amqp://guest:guest@rabbitmq:5672', function(err, conn) {
    if (err) {
      throw new Error(err);
    }

    // cb(conn);
    conn.createChannel(function(err, ch) {
      if (err) {
        throw new Error(err);
      }
      var ex = 'logs';

      ch.assertExchange(ex, 'fanout', { durable: false });
      ch.assertQueue(
        'control',
        { exclusive: true },
        function(err, q) {
          console.log(' [*] Waiting for messages in %s. To exit press CTRL+C', q.queue);

          if (err) {
            throw new Error(err);
          }
          ch.bindQueue(q.queue, ex, '');
          ch.consume(q.que, function(msg) {
            console.log(' [x] %s', msg.content.toString());
            addSensorData(msg.content.toString());
          });
        },
        { noAck: true }
      );
    });
  });
};

const addSensorData = async req => {
  req = JSON.parse(req);
  let device = await Device.findBySecurityCode(req.security_code);
  if (!!device) {
    req.data.forEach(async sensor => {
      let obj = device.sensors.find(o => o.name === sensor.name);
      if (!!obj) {
        // TODO update data
      } else {
        // TODO update data

        // =================================
        // Init sensor =====================
        // =================================
        let initSensor = {
          name: sensor.name,
          deviceId: device._id
        };
        let newSensor = new Sensor(initSensor);
        let sensorData = await newSensor.save();

        await Device.updateOne(
          { _id: device._id },
          {
            $push: { sensors: [{ _id: sensorData._id, name: sensorData.name }] }
          }
        );
      }
    });
  }
  // console.log(device);
  // TODO need more authorization
  // try {
  // const actuatorData = await Actuator.find({ deviceId: deviceId });
  // console.log(ac
  // )
  // if (actuatorData.length === 0) {

  // } else {
  //   res.status(200).json({
  //     success: true,
  //     actuators: actuatorData
  //   });
  // }
  // } catch (error) {
  //   console.log(error);
  // }
};
// {
//   security_code: '1234',
//     data : [
//     {
//       name : "humidity",
//       data : 35
//     },
//     {
//       name: 'temperature'
//       data : 15
//     }],
//     created_at : '15-16'
// }

// =================================================================
//   Add Sensor ====================================================
// =================================================================

// add humidity
// let humidity = {
//   name: 'humidity',
//   deviceId: deviceData._id
// };
// let sensor = new Sensor(humidity);
// let sensorData = await sensor.save();

// await Device.updateOne(
//   { _id: deviceData._id },
//   {
//     $push: { sensors: [{ _id: sensorData._id, name: sensorData.name }] }
//   }
// );

// // add temperature
// let temperature = {
//   name: 'temperature',
//   deviceId: deviceData._id
// };
// sensor = new Sensor(temperature);
// let temperatureData = await sensor.save();

// await Device.updateOne(
//   { _id: deviceData._id },
//   {
//     $push: { sensors: [{ _id: temperatureData._id, name: temperatureData.name }] }
//   }
// );
