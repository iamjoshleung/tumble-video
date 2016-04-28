var mongoose = require('mongoose');
var dbURI = 'mongodb://';
if (process.env.DB_USERNAME && process.env.DB_PASSWORD) {
  dbURI += process.env.DB_USERNAME + ':' + process.env.DB_PASSWORD + '@';
}
dbURI += process.env.DB_HOST;
if (process.env.DB_PORT) {
  dbURI += ':' + process.env.DB_PORT;
}
dbURI += '/' + process.env.DB_DATABASE_NAME;


mongoose.connect(dbURI);

var gracefulShutdown = function (msg, callback) {
  mongoose.connection.close(function () {
    console.log("Mongoose disconnected through " + msg);
    callback();
  });
};

mongoose.connection.on('connected', function () {
  console.log('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error', function (err) {
  console.log('Mongoose connection error ' + err);
});

mongoose.connection.on('disconnected', function () {
  console.log('Mongoose disconnected');
});

// Listen for SIGUSR2, which is what nodemon uses
process.once('SIGUSR2', function () {
  gracefulShutdown('nodemon restart', function () {
    process.kill(process.pid, 'SIGUSR2');
  });
});

// Listen for SIGINT emitted on application termination
process.on('SIGINT', function () {
  gracefulShutdown('app termination', function () {
    process.exit(0);
  });
});

// Listen for SIGTERM emitted when Heroku shuts down process
process.on('SIGTERM', function () {
  gracefulShutdown('Heroku app termination', function () {
    process.exit(0);
  });
});

require('./videos');
require('./options');
