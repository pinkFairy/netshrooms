const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const autoprefixer = require('autoprefixer');
const PropTypes = require('prop-types');

const sourceFolder = './webapp';
const destinationFolder = './dist';

module.exports = {
  entry: [
    `${sourceFolder}/index.jsx`,
  ],
  output: {
    path: __dirname,
    filename: `${destinationFolder}/bundle.js`
  },
  devtool: 'source-map',
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'source-map'
      }
    ],
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'node6-es6', 'react']
        }
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css!postcss!sass')
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },injectTapEventPlugin
  plugins: [
    new ExtractTextPlugin(`${destinationFolder}/style.css`, {
      allChunks: true
    }),
    new CopyWebpackPlugin([
      { from: `${sourceFolder}/i18n`, to: `${destinationFolder}/i18n/` },
      { from: `${sourceFolder}/kurento`, to: `${destinationFolder}/kurento/` },
      { from: `${sourceFolder}/index.html`, to: `${destinationFolder}/index.html` },
    ])
  ],
  postcss: function () {
    return [autoprefixer];
  }
};