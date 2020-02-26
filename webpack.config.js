const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// var MiniCssExtractPlugin = require('mini-css-extract-plugin');

const localeFiles = {};
const locales = ['en', 'fr', 'de', 'es', 'ja', 'nl', 'ta', 'zh'];
locales.forEach((locale) => {
	localeFiles[locale] = `./build/${locale}.js`;
});

module.exports = {
	entry: {
		app: './src/index.tsx',
		build: './src/build.tsx'
		// ...localeFiles
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
			template: './src/index.html',
			excludeChunks: locales
		}),
	],

	resolve: {
		extensions: ['.ts', '.tsx', '.js']
	},

	optimization: {
		chunkIds: 'named',
		splitChunks: {
			cacheGroups: {
				vendor: {
					test: /node_modules/,
					chunks: 'initial',
					name: 'vendor',
					priority: 10,
					enforce: true
				}
			}
		}
	},

	devtool: 'source-map'
};
