const router = require('express').Router();
const User = require('../models/User');

const changeStream = User.watch();

module.exports = function(io) {
  //Socket.IO
  io.on('connection', function(socket) {
    console.log('Socket Connection Established with ID :' + socket.id);
    //ON Events

    socket.on('chat', data => {
      console.log(data);
    });

    changeStream.on('change', change => {
      console.log(change); // You could parse out the needed info and send only that data.
      io.emit('changeData', change.fullDocument);
    });
    //End ON Events
  });
  return router;
};
