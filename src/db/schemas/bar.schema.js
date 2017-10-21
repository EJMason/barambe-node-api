const mongoose = require('mongoose');

// what indexes are needed?

// Any static methods that could be useful?

const bar_schema = new mongoose.Schema({

  // What the customers will see...
  display_name: {
    type: String,
    required: true,
    default: '',
  },

  // Short desc about the bar...
  description: String,

  // used for the mobile app
  logo_img: {
    type: String,
    default: '', // Need a default logo here...
  },

  banner_img: {
    type: String,
    default: '', // Need a default logo here...
  }
  //
  address: {},

  // Index by location for searching
  coords: {
    type: [Number],
    index: '2dsphere',
  },

  hours: {
    type: [[Number]],
            // sun      mon     tues    weds   thurs     fri     sat
            // 0-1440 mins per day
    default: [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]]
  },

  // verified: {
  //   type: Boolean,
  //   default: false,
  // }


  // nested schema
  // bartenders: {},
  // drinks: {},
  // ingredients: {}
})

module.exports = {
  bar_schema,
}