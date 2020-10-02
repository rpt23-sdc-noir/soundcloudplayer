var path = require('path');

module.exports = {
  entry: './client/index.jsx',
  output: {
    path: path.resolve(__dirname, './client'),
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      test: /\.jsx?$/, use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel-preset-react', '@babel-preset-env']
        }
      }
    }]
  }
};
