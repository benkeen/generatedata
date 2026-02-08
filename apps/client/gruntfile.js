const fs = require('fs');
const path = require('path');

const distFolder = path.join(__dirname, '/dist');
if (!fs.existsSync(distFolder)) {
  fs.mkdirSync(distFolder);
}

module.exports = function (grunt) {
  grunt.initConfig({
    cssmin: {
      options: {
        mergeIntoShorthands: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'dist/styles.css': [
            'src/resources/global.css',
            'src/resources/codemirror.css',
            'src/resources/ambience.css',
            'src/resources/bespin.css',
            'src/resources/cobalt.css',
            'src/resources/darcula.css',
            'src/resources/lucario.css'
          ]
        }
      }
    },
    copy: {
      main: {
        files: [
          {
            expand: true,
            cwd: 'src/images',
            src: ['*'],
            dest: 'dist/images/'
          }
        ]
      },

      // TODO should minify these too
      codeMirrorModes: {
        files: [
          {
            expand: true,
            cwd: './node_modules/codemirror/mode',
            src: ['**/*'],
            dest: 'dist/codeMirrorModes/'
          }
        ]
      },
      pluginWorkers: {
        files: [
          {
            expand: true,
            cwd: './node_modules/@generatedata/plugins/dist/workers',
            src: ['**/*'],
            dest: 'dist/workers/'
          },
          {
            expand: true,
            cwd: './node_modules/@generatedata/utils/dist/workers',
            src: ['**/*'],
            dest: 'dist/workers/'
          }
        ]
      }
    },
    watch: {},
    clean: {
      dist: ['dist']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-md5');

  grunt.registerTask('default', ['cssmin', 'copy']);
  grunt.registerTask('dev', ['cssmin', 'copy', 'watch']);
};
