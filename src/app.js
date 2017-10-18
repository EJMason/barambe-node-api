const config = require('config');
const express = require('express');
const chalk = require('chalk');

const app = express();

app.get('/test', (req, res) => {
  res.status(200).send('ok');
});

app.listen(config.port, () => {
  console.log(`Listening on port ${chalk.magenta(config.port)}`);
})
