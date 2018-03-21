'use strict';

const path = require('path');

const rootPath = path.resolve(__dirname, '..');

module.exports = {
  rootPath: rootPath,
  page: {
    path: rootPath + '/src/pages',
    scriptFilename: 'script.js',
    templateFilename: 'template.html'
  },
  dist: {
    development: {
      path: rootPath + '/dist',
    },
    production: {
      path: path.resolve(rootPath, '../resources')
    }
  }
}

