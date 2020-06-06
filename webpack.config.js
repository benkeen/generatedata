const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin')
// var MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {

	// juuuuust to make it really explicit & prevent unrecognized modes sneaking in
	const mode = argv.mode === 'production' ? 'production' : 'development';

	var config = {
		mode,
		entry: {
			app: './src/index.tsx'
		},

		output: {
			path: __dirname + '/dist',
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
			new HtmlWebpackPlugin({
				template: './src/index.html'
			})
		],

		resolve: {
			extensions: ['.ts', '.tsx', '.js']
		},

		optimization: {
			splitChunks: {
				chunks: 'all'
			}
		},

		devtool: 'source-map'
	};

	if (argv.mode === 'production') {
		config.optimization.minimizer = [
			new TerserPlugin()
		];
		config.optimization.minimize = true;
	}

	return config;
};
