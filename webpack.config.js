const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// var MiniCssExtractPlugin = require('mini-css-extract-plugin');

const locales = ['en', 'fr', 'de', 'es', 'ja', 'nl', 'ta', 'zh'].map((locale) => `./build/${locale}.js`);

module.exports = {
	entry: {
		app: [
			'./src/index.js',

			// locale bundles
			...locales
		]
	},
	output: {
		path: __dirname + '/dist',
		filename: '[name].js'
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: '/node_modules'
			},
			{
				test: /\.scss$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							modules: {
								localIdentName: '[name]_[local]_[hash:base64:5]',
							}
						}
					},
					{
						loader: 'sass-loader',
						options: {
						}
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
	]
};
