var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

var cors = require('cors');
var helmet = require('helmet');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var users = require('./routes/users');
var devices = require('./routes/devices');
var actuators = require('./routes/actuators');
var farms = require('./routes/farms');
var crops = require('./routes/crops');

var rabbitConn = require('./config/rabbitmqConsumer');

var configDB = require('./config/database.js');

// configuration ===============================================================
const connectDB = async () => {
  await mongoose.connect(
    configDB.url,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    },
    error => {
      if (error) console.log('error :', error);
      else console.log('Connect successfully');
    }
  );
  mongoose.set('useCreateIndex', true);
};

connectDB().catch(error => console.error(error));

// config log + security =========================================================
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// set up cors to allow us to accept requests from our client
app.use(
  cors({
    origin: '*', // allow to server to accept request from different origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true // allow session cookie from browser to pass through
  })
);

app.use(helmet());

app.use(
  require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
  })
);

// routes ======================================================================
app.use('/users', users);
app.use('/devices', devices);
app.use('/actuators', actuators);
app.use('/farms', farms);
app.use('/crops', crops);

// launch ======================================================================
var server = app.listen(3000);
// socket
app.io = require('socket.io')(server);
require('./routes/events')(app.io);

// rabbitmq ======================================================================
rabbitConn();

console.log('The magic happens on port ' + port);
