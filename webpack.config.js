const path = require('path');
const componentPath = path.resolve('./react/cows');
const webpack = require('webpack');

module.exports = {
  cache: false,
  context: path.join(__dirname),
  entry: {
    'app': './components/Main.js'
  },
  output: {
    path: path.join(__dirname, './dist/js'),
    filename: "[name].js"
  },
  resolve: {
    root: [componentPath]
  },
  resolveLoader: {
    //point the loaders to the node_modules directory
    root: path.join(__dirname, "node_modules") 
  },
  module: {
    loaders: [
      { 
        test: /\.js$/, 
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  }
};
