const fs = require('fs');

module.exports = {
  port: 3000,
  node_env: process.env.NODE_ENV,
  isProduction: (process.env.NODE_ENV === 'production'),
  isDevelopment: (process.env.NODE_ENV === 'development'),
  isTesting: (process.env.NODE_ENV === 'testing'),

  db: {
    uri: 'localhost',
    port: 27017,
    username: '',
    pass: '',
    dbName: 'default_db',

    // http://mongoosejs.com/docs/connections.html
    // all opts: http://mongodb.github.io/node-mongodb-native/2.2/api/MongoClient.html
    options: {
      useMongoClient: true,
      reconnectInterval: 500, // Reconnect every 500ms
      poolSize: 10, // Maintain up to 10 socket connections
      keepAlive: true,
      // autoIndex: false,                  // Don't build indexes
      // reconnectTries: Number.MAX_VALUE,  // Never stop trying to reconnect
      // bufferMaxEntries: 0                // error instead of try to reconnect
      // ssl: ,
      // socketTimeoutMS: ,
      // connectTimeoutMS: ,
      // authSource: ,
      // authMechanism: ,


    }
  }
}
