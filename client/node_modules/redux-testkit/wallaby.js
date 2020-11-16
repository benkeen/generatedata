/*eslint-disable*/
'use strict';

const babelOptions = {presets: ['react-native']};

process.env.wallabyScriptDir = __dirname;

module.exports = function(wallaby) {
  return {
    env: {
      type: 'node'
    },

    testFramework: 'jasmine',

    files: [
      {pattern: `node_modules/jasmine-expect/**/*.*`, instrument: false, load: false},
      'dist/**/*.js',
      'src/**/*.js',
      'test/**/*.js',
      '!test/**/*.[Ss]pec.js'
    ],

    tests: [
      'test/**/*.[Ss]pec.js'
    ],

    compilers: {
      '**/*.js': wallaby.compilers.babel(babelOptions)
    },

    setup: function(w) {
      require('babel-polyfill');
      require('app-root-path').setPath(w.projectCacheDir);
    }
  };
};

