// var mongoose = require('mongoose');

// var Cat = mongoose.model('Cat', { name: String });

// module.exports.init = () => {
//   console.log('connecting to mongoose...')
//   mongoose.connect('mongodb://localhost:2727/catLord', { useMongoClient: true });
//   mongoose.Promise = global.Promise;

// }


// module.exports.makeCat = (res) => {
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

// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   // we're connected!
//   console.log('connected!!!!')
// });