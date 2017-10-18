const fs = require('fs');

module.exports = {
  port: 3000,
  node_env: process.env.NODE_ENV,
  isProduction: (process.env.NODE_ENV === 'production'),
  isDevelopment: (process.env.NODE_ENV === 'development'),
  isTesting: (process.env.NODE_ENV === 'testing')
}
