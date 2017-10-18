const chalk = require('chalk');


/**
 * Node process events
 */
module.exports.processCloseEvents = (serverInstance, dbConnection) => {
  process.on('SIGINT', function onSigint () {
    console.info(
      'Got SIGINT (aka ctrl-c in docker). Graceful shutdown ',
      new Date().toISOString()
    );

    serverInstance.close((err) => {
      if (err) {
        console.error('There was an error');
        process.exitCode = 1;
      }
      process.exit();
    });
  });

  process.on('SIGTERM', function onSigterm () {
    console.info(
      'Got SIGTERM (docker container stop). Graceful shutdown ',
      new Date().toISOString()
    );

    serverInstance.close((err) => {
      if (err) {
        console.error('There was an error');
        process.exitCode = 1;
      }
      process.exit();
    });
  });
}

module.exports.onError = (error) => {
  if (error.syscall !== 'listen') throw error;
  switch (error.code) {
    case 'EACCES':
      console.error(`The Server requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`Port is already in use or blocked by the os`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

module.exports.onListening = (port, nodeEnv) => {
  console.log('');
  console.log(`${chalk.blue('Server Listening on port ')}${chalk.yellow(port)}`);
  console.log(`Environment: ${chalk.red(nodeEnv)}`);
  console.log('-----------------------------------------------------------------');
  console.log('');
}