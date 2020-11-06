var path = require('path');
var Compress = require('compression-webpack-plugin');
var Brotli = require('brotli-webpack-plugin');

module.exports = {
  entry: './client/src/index.jsx',
  output: {
    path: path.resolve(__dirname, './client'),
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-react', '@babel/preset-env']
        }
      }
    },
    {
      test: /\.css$/i,
      use: ['style-loader', 'css-loader']
    }]
  },
  plugins: [
    new Compress({
      filename: '[path][base].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.7
    }),
    new Brotli({
      asset: '[path].br[query]',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.7
    })
  ]
};
