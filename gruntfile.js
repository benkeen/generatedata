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
						'src/resources/codemirror.css',
						'src/resources/ambience.css',
						'src/resources/cobalt.css',
						'src/resources/darcula.css',
						'src/resources/elegant.css',
						'src/resources/lucario.css'
					]
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.registerTask('default', ['cssmin']);
};