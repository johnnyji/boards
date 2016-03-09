'use strict';

var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');

function join(dest) { return path.resolve(__dirname, dest); }

function web(dest) { return join('web/static/' + dest); }

var config = module.exports = {
  entry: {
    application: [
      web('styles/index.scss'),
      web('js/index.js'),
    ],
  },

  output: {
    path: join('priv/static'),
    filename: 'js/bundle.js',
  },

  resolve: {
    extensions: ['', '.js', '.sass', 'json'],
    modulesDirectories: ['node_modules']
  },

  module: {
    noParse: /vendor\/phoenix/,
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          cacheDirectory: true,
          plugins: ['add-module-exports', 'transform-decorators-legacy'],
          presets: ['react', 'es2015', 'stage-2', 'stage-0']
        }
      }, {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css!sass?indentedSyntax&includePaths[]=' + __dirname +  '/node_modules'),
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('css/application.css'),
    new webpack.ProvidePlugin({
      'Promise': 'exports?global.Promise!es6-promise',
      'window.fetch': 'exports?self.fetch!whatwg-fetch'
    })
  ],
  node: {
    fs: 'empty',
    net: 'empty',
    dns: 'empty'
  }
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({minimize: true})
  );
}