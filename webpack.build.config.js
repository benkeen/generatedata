const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: {
		app: './src/plugins.tsx',
	},

	output: {
		path: __dirname + '/dist',
		filename: '[name].js'
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
						loader: 'sass-loader'
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

	resolve: {
		extensions: ['.ts', '.tsx', '.js']
	},

	devtool: 'source-map'
};
