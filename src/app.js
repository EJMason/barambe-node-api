const config = require('config');
const express = require('express');
const http = require('http');
const chalk = require('chalk');

const utils = require('./utils/serverUtils');

const app = express();
const server = http.createServer(app);

app.get('/test', (req, res) => {
  res
  .status(200)
  .send('ok');
});

// add root middleware

// init event listeners
utils.processCloseEvents(server, {});

// routers

// test db connection

server.listen(config.port);

// -------------- Listeners ---------------- //

server.on('error', utils.onError);
server.on('listening', () => utils.onListening(config.port, process.env.NODE_ENV));

// ---- extra credit ---- //
// add logger