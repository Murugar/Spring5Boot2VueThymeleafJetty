'use strict';

const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const getDirectories = function (path) {
  return fs.readdirSync(path).filter(function (file) {
    return fs.statSync(path + '/' + file).isDirectory();
  });
};

exports.generateWebpackEntries = function (pagePath, scriptFilename) {
  let entries = {};
  const directories = getDirectories(pagePath);

  directories.forEach(function (directoryName, index) {
    entries[directoryName] = pagePath + '/' + directoryName + '/' + scriptFilename;
  });

  return entries;
};

exports.generateHtmlWebpackPlugins = function (pagePath, templateFilename, distPath, entries) {
  return Object.keys(entries).map(function (key) {
    return new HtmlWebpackPlugin({
      chunks: [key],
      inject: "body",
      filename: distPath + '/' + key + ".html",
      template: pagePath + '/' + key + '/' + templateFilename
    });
  });
};
