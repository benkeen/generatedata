// For testing callbacks.
var fs = require('fs');

module.exports = function(grunt) {
  'use strict';
  // Project configuration.
  grunt.initConfig({
    watch: {
      files: '<config:lint.files>',
      tasks: 'default'
    },
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        node: true,
        es5: true,
        globals: {}
      }
    },
    clean: {
      output: {
        src: ['test/fixtures/output']
      }
    },
    md5: {
      main: {
        files: {
          'test/fixtures/output/main/': 'test/fixtures/test.js'
        },
        options: {
          keepExtension: true,
          keepBasename: true
        }
      },
      noExtension: {
        files: {
          'test/fixtures/output/noExtension/': 'test/fixtures/test.js'
        },
        options: {
          keepExtension: false,
          keepBasename: true
        }
      },
      noBasename: {
        files: {
          'test/fixtures/output/noBasename/': 'test/fixtures/test.js'
        },
        options: {
          keepExtension: true,
          keepBasename: false
        }
      },
      noBasenameOrExtension: {
        files: {
          'test/fixtures/output/noBasenameOrExtension/': 'test/fixtures/test.js'
        },
        options: {
          keepExtension: false,
          keepBasename: false
        }
      },
      internationalCharacters: {
        files: {
          'test/fixtures/output/internationalCharacters/': 'test/fixtures/international.js'
        },
        options: {
          keepExtension: true,
          keepBasename: true
        }
      },
      expandFiles: {
        files: [
          {
            expand: true,
            cwd: 'test/fixtures/expand/',
            src: [
              '*.js'
            ],
            dest: 'test/fixtures/output/expand/js/'
          },
          {
            expand: true,
            cwd: 'test/fixtures/expand/',
            src: [
              '*.css'
            ],
            dest: 'test/fixtures/output/expand/css/'
          }
        ]
      },
      afterEach: {
        files: [
          {
            'test/fixtures/output/callback/': ['test/fixtures/test.js', 'test/fixtures/test2.js']
          },
          {
            expand: true,
            cwd: 'test/fixtures/expand/',
            src: [
              '*.js'
            ],
            dest: 'test/fixtures/output/callback/js/'
          },
          {
            expand: true,
            cwd: 'test/fixtures/expand/',
            src: [
              '*.css'
            ],
            dest: 'test/fixtures/output/callback/css/'
          }
        ],
        options: {
          afterEach: function(fileChange) {
            var fileContent = [
              'newPath:' + fileChange.newPath,
              'oldPath:' + fileChange.oldPath,
              'content:' + fileChange.content,
              ''
            ].join('\n');
            // Doing sync here because there isn't a way to do async in task execution.
            fs.appendFileSync('test/fixtures/output/afterEach.out', fileContent);
          }
        }
      },
      after: {
        files: [
          {
            'test/fixtures/output/after/': ['test/fixtures/test.js', 'test/fixtures/test2.js']
          },
          {
            expand: true,
            cwd: 'test/fixtures/expand/',
            src: [
              '*.js'
            ],
            dest: 'test/fixtures/output/after/js/'
          },
          {
            expand: true,
            cwd: 'test/fixtures/expand/',
            src: [
              '*.css'
            ],
            dest: 'test/fixtures/output/after/css/'
          }
        ],
        options: {
          after: function(fileChanges) {
            var fileContent = '';
            fileChanges.forEach(function(fileChange) {
              fileContent += [
                'newPath:' + fileChange.newPath,
                'oldPath:' + fileChange.oldPath,
                'content:' + fileChange.content,
                ''
              ].join('\n');
            });
            // Doing sync here because there isn't a way to do async in task execution.
            // Do a writeFileSync instead of appendFileSync to help the tests ensure this after callback only runs once
            fs.writeFileSync('test/fixtures/output/after.out', fileContent);
          }
        }
      },
      contextAndOptionsAfterEach: {
        files: {
          'test/fixtures/output/contextAndOptions/': 'test/fixtures/test.js'
        },
        options: {
          findMe: true,
          afterEach: function(fileChange, options) {
            var fileContent = 'options=' + typeof options + '\nfindMe=' + options.findMe + '\nthis.nameArgs=' + this.nameArgs;
            fs.appendFileSync('test/fixtures/output/contextAndOptions/afterEach.out', fileContent);
          }
        }
      },
      contextAndOptionsAfter: {
        files: {
          'test/fixtures/output/contextAndOptions/': ['test/fixtures/test.js', 'test/fixtures/test2.js']
        },
        options: {
          findMe: true,
          after: function(fileChanges, options) {
            var fileContent = 'options=' + typeof options + '\nfindMe=' + options.findMe + '\nthis.nameArgs=' + this.nameArgs;
            fs.appendFileSync('test/fixtures/output/contextAndOptions/after.out', fileContent);
          }
        }
      },
      binary: {
        files: {
          'test/fixtures/output/': ['test/fixtures/grunt-logo.png']
        }
      },
      nestedDirs: {
        files: {
          'test/fixtures/output/':  'test/fixtures/*'
        }
      }
    },
    nodeunit: {
      tests: 'test/*_test.js'
    }
  });

  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.registerTask('test', ['clean', 'md5', 'nodeunit', 'clean']);
  grunt.registerTask('default', ['jshint', 'test']);
};
