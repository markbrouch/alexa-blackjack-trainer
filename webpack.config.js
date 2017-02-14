'use strict';

const path = require('path');
const externals = require('webpack-node-externals');
const pkg = require('./package.json');

module.exports = {
  entry: path.resolve(__dirname, pkg.main),
  output: {
    path: path.join(__dirname, 'dist'),
    libraryTarget: 'commonjs2',
    filename: path.basename(pkg.main)
  },
  target: 'node',
  externals: [externals({
    whitelist: ['engine-blackjack']
  })],
  module: {
    preLoaders: [
      { test:/\.js$/, loader:'eslint' }
    ],
    loaders: [
      { test:/\.js$/, loader:'babel' },
      { test:/\.json$/, loader:'json' }
    ]
  },
  eslint: {
    failOnWarning: false,
    failOnError: true
  }
};
