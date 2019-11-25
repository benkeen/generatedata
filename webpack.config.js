var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
// var MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
	entry: {
		app: ['./src/index.js']
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
							},
							// url: false,
							// sourceMap: true
						}
					},
					{
						loader: 'sass-loader',
						options: {
							// sourceMap: true
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
	output: {
		path: __dirname + '/dist',
		filename: '[name].js'
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html'
		})
	]
};


// const config = (env) => {
// 	const isDev = env === 'development';
//
// 	console.log(env);
//
// 	return {
// 		mode: env,
// 		entry: [
// 			'src/index.js'
// 		],
// 		output: {
// 			path: '/dist',
// 			publicPath: '/dist',
// 			filename: '[name].bundle.js'
// 		},
// 		devServer: {
// 			contentBase: '/dist',
// 			compress: true,
// 			port: 9000
// 		},
// 		module: {
// 			rules: [
// 				{
// 					test: /\.(js|jsx)$/,
// 					exclude: /node_modules/,
// 					use: ['babel-loader']
// 				},
//
// 				// {
// 				// 	test: /\.scss$/,
// 				// 	use: [
// 				// 		'style-loader',
// 				// 		{
// 				// 			loader: 'css-loader',
// 				// 			options: {
// 				// 				modules: {
// 				// 					localIdentName: '[name]_[local]_[hash:base64:5]',
// 				// 				},
// 				// 				url: false,
// 				// 				sourceMap: isDev
// 				// 			}
// 				// 		},
// 				// 		{
// 				// 			loader: 'sass-loader',
// 				// 			options: {
// 				// 				sourceMap: isDev
// 				// 			}
// 				// 		}
// 				// 	]
// 				// },
// 				// {
// 				// 	test: /\.css$/,
// 				// 	use: [
// 				// 		'style-loader',
// 				// 		'css-loader'
// 				// 	]
// 				// }
// 			]
// 		},
// 		resolve: {
// 			extensions: ['*', '.js']
// 		},
// 		plugins: [
// 			// new MiniCssExtractPlugin({
// 			// 	filename: '[name].css',
// 			// 	chunkFilename: '[id].css'
// 			// })
// 		],
// 		devtool: 'source-map',
// 		watch: isDev
// 	};
// };
//
// module.exports = [config];
