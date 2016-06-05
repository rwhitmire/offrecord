var webpack = require('webpack')

var devtool = null
var plugins = []


/**
 * development settings
 */
if (process.env.NODE_ENV === 'development') {
  devtool = 'cheap-module-eval-source-map';
}


/**
 * production settings
 */
if (process.env.NODE_ENV === 'production') {
  plugins = plugins.concat([
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),

    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]);
}


module.exports = {
  entry: "./client/chat",
  output: {
    path: __dirname + "/public/javascripts/bundles",
    filename: "chat.js"
  },
  devtool: devtool,
  plugins: plugins
}
