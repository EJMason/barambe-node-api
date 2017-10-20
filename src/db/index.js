var mongoose = require('mongoose');

mongoose.connect('mongodb://mongodb-docker/bar_main', { useMongoClient: true });
mongoose.Promise = global.Promise;


// ----------- RM below --------------- /

var Cat = mongoose.model('Cat', { name: String });


const makeCat = () => {
  console.log('adding a cat...');
  var kitty = new Cat({ name: 'Zildjian' });
  kitty.save(function (err) {
    if (err) {
      console.log('Kitty error...');
      console.log(err);
    } else {
      console.log('Send the kitty')
      console.log(kitty);
    }
  });
}

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  // we're connected!
  makeCat();
  console.log('connected!!!!');
});