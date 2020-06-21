const router = require('express').Router();
const Tracking = require('../models/Tracking');

const changeStream = Tracking.watch();

module.exports = function(io) {
  //Socket.IO
  io.on('connection', function(socket) {
    console.log('Socket Connection Established with ID :' + socket.id);
    //ON Events

    changeStream.on('change', change => {
      // You could parse out the needed info and send only that data.
      io.emit(change.documentKey._id, change.documentKey);
    });
    //End ON Events
  });
  return router;
};
