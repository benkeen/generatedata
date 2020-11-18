const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');


module.exports = (env, argv) => {

	// TODO not working with package.json commands
	const mode = argv.mode === 'production' ? 'production' : 'development';

	var config = {
		mode,

		entry: {
			app: path.resolve(__dirname, 'src/index.tsx')
		},

		output: {
			path: path.join(__dirname, 'dist'),
			chunkFilename: mode === 'development' ? '[name].js' : '[name]-[hash].js',
			filename: mode === 'development' ? '[name].js' : '[name]-[hash].js'
		},

		module: {
			rules: [
				{
					test: /\.tsx?$/,
					loader: ['ts-loader', 'eslint-loader']
				},
				{
					test: /\.js$/,
					loader: ['babel-loader'],
					exclude: '/node_modules'
				},
				{
					test: /\.scss$/,
					use: [
						'style-loader',
						{
							loader: '@teamsupercell/typings-for-css-modules-loader'
						},
						{
							loader: 'css-loader',
							options: {
								modules: {
									localIdentName: '[name]__[local]--[hash:base64:3]'
								}
							}
						},
						{
							loader: 'sass-loader',
							options: {}
						}
					]
				},
				{
					test: /\.css$/,
					use: [
						'style-loader',
						'css-loader'
					]
				}
			]
		},

		plugins: [
			new CaseSensitivePathsPlugin(),
			new HtmlWebpackPlugin({
				template: path.join(__dirname, 'src/index.html')
			})
		],

		resolve: {
			extensions: ['.ts', '.tsx', '.js'],
			alias: {
				'~components': path.join(__dirname, 'src/components'),
				'~utils': path.join(__dirname, 'src/utils'),
				'~types': path.join(__dirname, 'types')
			}
		},

		optimization: {
			splitChunks: {
				chunks: 'all'
			}
		},

		devtool: (mode === 'development') ? 'source-map' : false
	};

	if (mode === 'development') {
		config.devServer = {
			contentBase: path.join(__dirname, 'dist'),
			// host: '0.0.0.0', // needed when running within docker container
			port: 9000,
			open: true
			// publicPath: path.join(__dirname, 'dist')
		};
	}

	if (mode === 'production') {
		config.optimization.minimizer = [
			new TerserPlugin()
		];
		config.optimization.minimize = true;
	}

	return config;
};
