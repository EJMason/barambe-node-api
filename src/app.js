const fs = require('fs');
const path = require('path');
const http = require('http');
const config = require('config');
const express = require('express');
const chalk = require('chalk');
const bodyParser = require('body-parser');

const utils = require('./utils/serverEvents');

const app = express();
const server = http.createServer(app);

var accessLogStream = fs.createWriteStream(path.join(__dirname ,'access.log'), {flags: 'a'})

// watch for sigint and sigterm
utils.processCloseEvents(server, {});

// -------------------------------- Middleware -------------------------------- //
// https://github.com/expressjs/body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// * --> production middleware...
if (config.isProduction) {
  // https://github.com/helmetjs/helmet
  app.use(require('helmet')());
}

// * --> develpoment middleware
if (config.isDevelopment) {
  console.log('\nInitializing development middleware...');

  // https://github.com/expressjs/morgan
  app.use(require('morgan')('dev'));
  // app.use(morgan('combined', {stream: accessLogStream}));
}


app.get('/test', (req, res) => {
  res
  .status(200)
  .send('ok');
});


// routers

// test db connection


// --------------------------------- Listeners --------------------------------- //
server.listen(config.port);

server.on('listening', () => utils.onListening(config.port, process.env.NODE_ENV));
server.on('error', utils.onError);

// -------------------------------- extra credit ------------------------------ //
// add logger


// end