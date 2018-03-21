'use strict';

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const utils = require('./utils');
const config = require('./config');
const baseWebpackConfig = require("./webpack.config.base");

const distPath = config.dist.development.path;
const entries = baseWebpackConfig.entry;

const htmlWebpackPlugins = utils.generateHtmlWebpackPlugins(
  config.page.path,
  config.page.templateFilename,
  distPath,
  entries
);

const plugins = htmlWebpackPlugins.concat([
  new CopyWebpackPlugin([
    {
      context: config.rootPath + '/src/assets',
      from: '**/*',
      to: distPath + '/assets'
    }
  ])
]);

const webpackConfig = merge(baseWebpackConfig, {
  plugins: plugins,
  output: {
    path: distPath,
    publicPath: '/',
  },
  devServer: {
    publicPath: '/',
    noInfo: true,
    overlay: true,
    historyApiFallback: true,
    proxy: [{
      bypass: function (req, res, proxyOptions) {
        return req.url + '.html';
      }
    }],
  },
  performance: {
    hints: 'warning'
  },
  devtool: '#eval-source-map'
});

module.exports = webpackConfig;
