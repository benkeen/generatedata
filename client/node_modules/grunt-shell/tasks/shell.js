'use strict';
const {exec} = require('child_process');
const chalk = require('chalk');
const stripAnsi = require('strip-ansi');
const npmRunPath = require('npm-run-path');

const TEN_MEGABYTES = 1000 * 1000 * 10;

module.exports = grunt => {
	grunt.registerMultiTask('shell', 'Run shell commands', function (...args) {
		const callback = this.async();
		const options = this.options({
			stdout: true,
			stderr: true,
			stdin: true,
			failOnError: true,
			stdinRawMode: false,
			preferLocal: true,
			execOptions: {
				env: null
			}
		});

		let cmd = (typeof this.data === 'string' || typeof this.data === 'function') ?
			this.data :
			this.data.command;

		if (cmd === undefined) {
			throw new Error('`command` required');
		}

		// Increase max buffer
		options.execOptions = Object.assign({}, options.execOptions);
		options.execOptions.maxBuffer = options.execOptions.maxBuffer || TEN_MEGABYTES;

		cmd = grunt.template.process(typeof cmd === 'function' ? cmd.apply(grunt, args) : cmd);

		if (options.preferLocal === true) {
			options.execOptions.env = npmRunPath.env({env: options.execOptions.env || process.env});
		}

		if (this.data.cwd) {
			options.execOptions.cwd = this.data.cwd;
		}

		const cp = exec(cmd, options.execOptions, (error, stdout, stderr) => {
			if (typeof options.callback === 'function') {
				options.callback.call(this, error, stdout, stderr, callback);
			} else {
				if (error && options.failOnError) {
					grunt.warn(error);
				}
				callback();
			}
		});

		const captureOutput = (child, output) => {
			if (grunt.option('color') === false) {
				child.on('data', data => {
					output.write(stripAnsi(data));
				});
			} else {
				child.pipe(output);
			}
		};

		grunt.verbose.writeln('Command:', chalk.yellow(cmd));

		if (options.stdout || grunt.option('verbose')) {
			captureOutput(cp.stdout, process.stdout);
		}

		if (options.stderr || grunt.option('verbose')) {
			captureOutput(cp.stderr, process.stderr);
		}

		if (options.stdin) {
			process.stdin.resume();
			process.stdin.setEncoding('utf8');

			if (options.stdinRawMode && process.stdin.isTTY) {
				process.stdin.setRawMode(true);
			}

			process.stdin.pipe(cp.stdin);
		}
	});
};
