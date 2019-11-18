/**

Chunks:
 - initial page (loading)
 - core
 - individual plugins? Grouped?

*/
var webpack = require('webpack');
var path = require('path');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');


const config = (env) => {
	const isDev = env === 'development';

	return {
		mode: env,
		entry: [
			'./src/index.js'
		],
		output: {
			path: path.resolve(__dirname, 'dist'),
			publicPath: './dist/',
			filename: '[name].bundle.js'
		},
		module: {
			rules: [
				{
					test: /\.(js|jsx)$/,
					exclude: /node_modules/,
					use: ['babel-loader']
				},
				{
					test: /\.scss$/,
					use: [
						MiniCssExtractPlugin.loader,
						{
							loader: 'css-loader',
							options: {
								modules: {
									localIdentName: '[name]_[local]_[hash:base64:5]',
								},
								url: false,
								sourceMap: isDev
							}
						},
						{
							loader: 'resolve-url-loader',
							options: {
								silent: true
							}
						},
						{
							loader: 'sass-loader',
							options: {
								sourceMap: isDev
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
		resolve: {
			extensions: ['*', '.js']
		},
		plugins: [
			new MiniCssExtractPlugin({
				filename: '[name].css',
				chunkFilename: '[id].css'
			})
		],
		devtool: 'source-map',
		watch: isDev
	};
};

module.exports = [config];
