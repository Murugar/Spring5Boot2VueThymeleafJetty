'use strict';

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const utils = require('./utils');
const config = require('./config');
const baseWebpackConfig = require("./webpack.config.base");

const distPath = config.dist.production.path;
const entries = baseWebpackConfig.entry;

const htmlWebpackPlugins = utils.generateHtmlWebpackPlugins(
  config.page.path,
  config.page.templateFilename,
  (distPath + '/templates'),
  entries
);

const plugins = htmlWebpackPlugins.concat([
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"production"'
    }
  }),
  new CleanWebpackPlugin(
    // paths
    [
      'static/js/**/*',
      'static/assets/**/*',
      'templates/**/*.html'
    ],
    // options
    {
      root: distPath,
      verbose: true,
    }
 ),
  new webpack.optimize.UglifyJsPlugin({
    sourceMap: false,
    compress: {
      warnings: false
    }
  }),
  new webpack.LoaderOptionsPlugin({
    minimize: true
  }),
  new CopyWebpackPlugin([
    {
      context: config.rootPath + '/src/assets',
      from: '**/*',
      to: distPath + '/static/assets/'
    }
  ])
]);

const webpackConfig = merge(baseWebpackConfig, {
  plugins: plugins,
  output: {
    path: distPath + '/static/js',
  },
  performance: {
    hints: false
  },
  devtool: '#source-map'
});

module.exports = webpackConfig;
