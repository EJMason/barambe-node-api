const mongoose = require('mongoose');
const config = require('config');
const chalk = require('chalk');

// debugging...
if (!config.has('db')) {
  console.error('Error... db config does not exist!');
} else {
  console.log('Getting db config...');
  console.log(`${chalk.yellow('DB config using:')} ${config.node_env}`);
}

const dbSettings = config.get('db');

console.log('Initializing db promise library...');
mongoose.Promise = require('bluebird');

const bootstrapDatabase = async () => {
  try {
    console.log('Initializing connection to bartender database...');
    const connstr = `mongodb://${dbSettings.uri}/${dbSettings.dbName}`;
    await mongoose.connect(connstr, dbSettings.options);
    return true;
  } catch (error) {
    console.error('DB Error, error in db bootstrap...');
    console.error('error');
  }
}


// ----------- RM below --------------- /

// var Cat = mongoose.model('Cat', { name: String });


// const makeCat = () => {
//   console.log('adding a cat...');
//   var kitty = new Cat({ name: 'Zildjian' });
//   kitty.save(function (err) {
//     if (err) {
//       console.log('Kitty error...');
//       console.log(err);
//     } else {
//       console.log('Send the kitty')
//       console.log(kitty);
//     }
//   });
// }

// ----------------- Listeners ------------------------- //

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'db error:'));
db.once('open', () => {
  console.log('connected!!!!');
});