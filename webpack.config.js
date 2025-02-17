const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    content: './content/content.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.js']
  }
}; 