const path = require('path');

module.exports = {
  context: __dirname,
  entry: './index.js',
  output: {
    path: path.join(__dirname, '/bin'),
    filename: 'bundle.js'
  },
  node: {
    fs: true
  }
};
