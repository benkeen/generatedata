/*
 * grunt-md5
 * https://github.com/jney/grunt-md5
 *
 * Copyright (c) 2012 Jean-Sébastien Ney
 * Licensed under the MIT license.
 */

/*global _:true, require:true*/

module.exports = function(grunt) {
  'use strict';

  // TODO: ditch this when grunt v0.4 is released
  grunt.util = grunt.util || grunt.utils;

  var _ = grunt.util._;
  var path = require('path');

  grunt.registerMultiTask('md5', 'Generate a md5 filename', function() {
    // file object : {newPath: /***/, oldPath: /***/, content: /***/}
    var currentFile;
    var options = this.options({
      encoding: null
    });

    var context = this;

    grunt.verbose.writeflags(options, 'Options');

    // Keep track of processedFiles so we can call the `after` callback if needed.
    var processedFiles = [];

    this.files.forEach(function(filePair) {
      var isExpandedPair = filePair.orig.expand || false;

      if (typeof filePair.src === 'undefined') {
        grunt.fail.warn('Files object doesn\'t exist');
      }

      filePair.src.filter(function(filepath) {
        return grunt.file.isFile(filepath);
      })
      .forEach(function(srcFile) {
        try {
          var basename = '';
          var destFile;
          var ext = '';
          var filename;
          var srcCode = grunt.file.read(srcFile, {encoding: options.encoding});

          // keep extension unless you explicitly tell to not
          if (options.keepExtension !== false) {
            ext = path.extname(srcFile);
          }

          // keep basename unless you explicitly tell to not
          if (options.keepBasename !== false) {
            basename = path.basename(srcFile, ext || path.extname(srcFile)) + '-';
          }

          filename = basename +
            require('crypto').
            createHash('md5').
            update(srcCode, options.encoding).
            digest('hex') + ext;

          var regex = new RegExp(escapeRegExp(path.basename(srcFile)) + "$");
          if (detectDestType(filePair.dest) === 'directory') {
            destFile = (isExpandedPair) ? filePair.dest.replace(regex, filename) : unixifyPath(path.join(filePair.dest, filename));
          } else {
            destFile = filePair.dest.replace(regex, filename);
          }
          grunt.file.copy(srcFile, destFile);

          currentFile = {
            newPath: destFile,
            oldPath: srcFile,
            content: srcCode
          };

          // for callback after each file
          if (_.isFunction(options.afterEach)) {
            options.afterEach.call(context, currentFile, options);
          }

          if (_.isFunction(options.after)) {
            processedFiles.push(currentFile);
          }

          grunt.log.writeln('File \'' + destFile + '\' created.');
        } catch(err) {
          grunt.log.error(err);
          grunt.fail.warn('Fail to generate an MD5 file name');
        }
      });
    });

    // call `after` if defined
    if (_.isFunction(options.after)) {
      options.after.call(context, processedFiles, options);
    }
  });

  // From grunt-contrib-copy
  var detectDestType = function(dest) {
    if (grunt.util._.endsWith(dest, '/')) {
      return 'directory';
    } else {
      return 'file';
    }
  };

  // From grunt-contrib-copy
  var unixifyPath = function(filepath) {
    if (process.platform === 'win32') {
      return filepath.replace(/\\/g, '/');
    } else {
      return filepath;
    }
  };

  // http://stackoverflow.com/a/3561711
  var escapeRegExp = function(s) {
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  };
};

