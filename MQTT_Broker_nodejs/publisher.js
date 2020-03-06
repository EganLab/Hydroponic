var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://192.168.43.46');

client.on('connect', () => {
  setInterval(() => {
    client.publish('myTopic', 'Hello mqtt');
    console.log('Message Sent');
  }, 5000);
});
