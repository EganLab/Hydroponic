var amqp = require('amqplib/callback_api');

module.exports = function(cb) {
  amqp.connect('amqp://guest:guest@rabbitmq:5672', function(err, conn) {
    if (err) {
      throw new Error(err);
    }

    cb(conn);
  });
};
