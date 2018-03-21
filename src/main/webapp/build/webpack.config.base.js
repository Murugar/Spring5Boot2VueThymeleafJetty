'use strict';

const utils = require('./utils');
const config = require('./config');

const entries = utils.generateWebpackEntries(
  config.page.path,
  config.page.scriptFilename
);

const baseWebpackConfig = {
  entry: entries,
  plugins: [],
  output: {
    publicPath: '/js',
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {}
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader'
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '/components': config.rootPath + '/src/components'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  performance: {
    hints: false
  }
};

module.exports = baseWebpackConfig;
