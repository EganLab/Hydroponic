var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://192.168.43.46');

client.on('connect', () => {
  client.subscribe('myTopic');
});

client.on('message', (topic, message) => {
  context = message.toString();
  console.log(context);
});
