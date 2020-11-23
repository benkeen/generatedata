const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

require('dotenv').config();

module.exports = (env, argv) => {
	const mode = argv.mode === 'production' ? 'production' : 'development'; // TODO not working with package.json commands

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
								},
								url: false
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
				'~store': path.join(__dirname, 'src/core/store'),
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
			historyApiFallback: true,
			contentBase: path.join(__dirname, 'dist'),
			// publicPath: 'http://localhost:9000',
			port: process.env.GD_DEV_SERVER_PORT,
			open: true
			// host: '0.0.0.0', // needed when running within docker container
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
