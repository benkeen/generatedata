module.exports = function(grunt) {

	var config = {
		pkg: grunt.file.readJSON('package.json'),

		uglify: {
			coreCSS: {
				files: {
					'cache/core.css': [
						'resources/themes/classic/compiled/styles.css',
						'resources/css/smoothness/jquery-ui.min.css',
						'resources/css/chosen/chosen.css',
						'resources/css/tablesorter.theme.css',
						'resources/libs/codemirror/lib/codemirror.css'
					]
				},
				options: {
					report: "min",
					compress: true
				}
			},
			coreJS: {
				files: {
					'cache/core.js': [
						'resources/libs/codemirror/lib/codemirror.min.js',
						'resources/scripts/libs/jquery.min.js',
						'resources/scripts/libs/chosen.jquery.min.js',
						'resources/scripts/libs/require.js',
						'resources/scripts/requireConfig.js',
						'resources/scripts/libs/spinners.js',

						// pity, but now everyone gets them <!--[if lt IE 9]>
						'resources/scripts/libs/html5shiv.js',
						'resources/scripts/libs/excanvas.js'
					]
				},
				options: {
					report: "min",
					compress: true
				}
			}
		},
		md5: {
			prod: {
				files: {

				},
				options: {
					after: function(fileChanges) {
						//config.template.prod.options.data.APP_START_PATH = fileChanges[0].newPath;
					}
				}
			}
		},
		requirejs: {
			compile: {
				options: {
					name: "cache/appStart",
					baseUrl: "./",
					mainConfigFile: "core/requireConfig.js",
					out: "./cache/appStart.min.js"
				}
			}
		}
	};

	grunt.initConfig(config);

	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-md5');
	grunt.loadNpmTasks('grunt-template');

	grunt.registerTask('prod', [

		// uglify the
		'uglify:coreCSS',
		'uglify:coreJS',

	]);

//	grunt.registerTask('default', ['uglify', 'requirejs', 'template']);
//	grunt.registerTask('dev', ['uglify', 'requirejs', 'template:dev']);
//	grunt.registerTask('prod', ['uglify', 'requirejs', 'md5', 'template:prod']);

};