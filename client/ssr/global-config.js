const path = require('path');

module.exports = {
  PORT: process.env.SSR_PORT || 3000,

  staticFilesPrefix: '/static',
  paths: {
    env: path.resolve(__dirname, '..', '.env'),
    pages: path.resolve(__dirname, '..', 'pages'),
    static: path.resolve(__dirname, '..', 'public'),
  },
};
