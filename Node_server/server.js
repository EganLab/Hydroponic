var express = require('express');
var app = express();
var port = process.env.PORT || 30001;

var cors = require('cors');
var helmet = require('helmet');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var routes = require('./routes/index');

var configDB = require('./config/database.js');

// configuration ===============================================================
mongoose.connect(configDB.url, { useUnifiedTopology: true, useNewUrlParser: true }, error => {
  if (error) console.log(error);
  else console.log('Connect successfully');
});
mongoose.set('useCreateIndex', true);

// show log
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
app.use('/', routes);

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
