const chalk = require('chalk');
const mongoose = require('mongoose');


/**
 * Node process events
 */
module.exports.processCloseEvents = (serverInstance, dbConnection) => {
  console.log('Initializing the listeners...');
  // Sigint
  process.on('SIGINT', function onSigint () {
    console.info('Got SIGINT');
    console.info('  - someone pressed ctrl + c ....');
    console.info(`Stop Time: ${new Date().toISOString()}`);

    // wait for mongoose closure...
    mongoose.connection.close(true, (a, b) => {
      console.log('This is the first db arg');
      console.log(a);
      console.log('Second db cb arg ');
      console.log(b);
      shutdown(serverInstance);
    })
  });

  // Sigterm
  process.on('SIGTERM', function onSigterm () {
    console.info('Got SIGTERM');
    console.info('  - Docker container stop');
    console.info(`Stop Time: ${new Date().toISOString()}`);

    // wait for mongoose closure...
    mongoose.connection.close(true, (a, b) => {
      console.log('This is the first db arg');
      console.log(a);
      console.log('Second db cb arg ');
      console.log(b);
      shutdown(serverInstance);
    })
  });

}

/**
 * Error handler for process
 */
module.exports.onError = (error) => {
  console.log('ERROR!!!!!!!!!!!!!');
  console.log(error);
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

/**
 * Output info for development
 */
module.exports.onListening = (port, nodeEnv) => {
  console.log('');
  console.log(`${chalk.blue('Server Listening on port ')}${chalk.yellow(port)}`);
  console.log(`Environment: ${chalk.red(nodeEnv)}`);
  console.log('-----------------------------------------------------------------');
  console.log('');
}

// ______Private methods______
function shutdown(server) {
  console.log('Shutting down...');
  server.close(function onServerClosed (err) {
    if (err) {
      console.error(err);
      process.exitCode = 1;
		}
		process.exit();
  })
}

