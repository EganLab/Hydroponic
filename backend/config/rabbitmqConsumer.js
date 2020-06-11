var amqp = require('amqplib/callback_api');
// const Sensor = require('../models/Sensor');

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
          });
        },
        { noAck: true }
      );
    });
  });
};

// const addSensorData = (req) => {
//   let deviceId = req;
//   // TODO need more authorization
//   try {
//     const actuatorData = await Actuator.find({ deviceId: deviceId });
//     if (actuatorData.length === 0) {

//     } else {
//       res.status(200).json({
//         success: true,
//         actuators: actuatorData
//       });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }
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
