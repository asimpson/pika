const path = require('path');
const componentPath = path.resolve('./components');
const webpack = require('webpack');
const environment = process.env.NODE_ENV || 'development';
const plugins = [];

/* Ensure we use the approriate version of React.
 * Reference: http://facebook.github.io/react/downloads.html#npm
 */
plugins.push(new webpack.EnvironmentPlugin(["NODE_ENV"]));
console.log('building for', environment);

module.exports = {
  cache: false,
  plugins: plugins,
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
