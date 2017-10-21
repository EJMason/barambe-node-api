const fs = require('fs');
const path = require('path');
const http = require('http');

const config = require('config');
const mongoose = require('mongoose');
const express = require('express');
const chalk = require('chalk');
const bodyParser = require('body-parser');

const utils = require('./utils/serverEvents');
const db = require('./db');

const app = express();
const server = http.createServer(app);

var accessLogStream = fs.createWriteStream(path.join(__dirname ,'access.log'), {flags: 'a'})


// ---------------------------------- Middleware ---------------------------------- //

// https://github.com/expressjs/body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// * --> production middleware <-- * //
if (config.isProduction) {
  // https://github.com/helmetjs/helmet
  app.use(require('helmet')());
}

// * --> develpoment middleware <-- * //
if (config.isDevelopment) {
  console.log('\nInitializing development middleware...');

  // https://github.com/expressjs/morgan
  app.use(require('morgan')('dev'));
  // app.use(morgan('combined', {stream: accessLogStream}));
}



// ------------------------------- HEALTHCHECK ------------------------------------ //
app.get('/healthz', function (req, res) {
  res.status(200).send('I am happy and healthy\n');
});


// routers

// ---------------------------------- READY GO! ----------------------------------- //

// connect to default db

db
  .bootstrapDatabase()
    .then(() => {
      console.log('Finished bootstrapping database...');
    })
    .catch(err => {
      console.error('There was an error bootstrapping the db..');
      console.error(err);
    })


mongoose.connection
.on('open', () => {
  console.log(__filename, '  |  connection to db open success...');
  console.log('Begin connection to server....');

  // database is now open... go ahead and listen
  server.listen(config.port);
  utils.processCloseEvents(server, {});
})
// server.listen(config.port);


// --------------------------------- Listeners --------------------------------- //

// these are listening for the server to close


server.on('listening', () => utils.onListening(config.port, process.env.NODE_ENV));
server.on('error', utils.onError);

// -------------------------------- extra credit ------------------------------ //
/*
    TODO: add logger: winston, pino, etc...
*/
// end