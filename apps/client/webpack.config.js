const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const ESLintPlugin = require('eslint-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// const envPath = path.resolve(__dirname, '../../.env');
// require('dotenv').config({ path: envPath });

module.exports = (env, argv) => {
	const mode = argv.mode === 'production' ? 'production' : 'development'; // TODO not working with package.json commands

	var config = {
		mode,

		entry: {
			app: path.resolve(__dirname, 'src/index.tsx')
		},

		output: {
			path: path.join(__dirname, 'dist'),
			publicPath: '/',
			chunkFilename: mode === 'development' ? '[name].js' : '[name]-[hash].js',
			filename: mode === 'development' ? '[name].js' : '[name]-[hash].js'
		},

		module: {
			rules: [
				{
					test: /\.tsx?$/,
					use: [{ loader: 'ts-loader' }]
					// exclude: [
					// 	path.resolve(__dirname, '../cli')
					// ]
				},
				{
					test: /\.js$/,
					use: [
						{
							loader: 'babel-loader'
						}
					],
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
					use: ['style-loader', 'css-loader']
				}
			]
		},

		plugins: [
			new ESLintPlugin({
				extensions: ['js', 'ts']
			}),
			new CaseSensitivePathsPlugin(),
			new HtmlWebpackPlugin({
				template: path.join(__dirname, 'src/index.html')
			})
			// new Dotenv({ path: envPath })
		],

		resolve: {
			extensions: ['.ts', '.tsx', '.js'],
			alias: {
				'~components': path.join(__dirname, 'src/components'),
				'~utils': path.join(__dirname, 'src/utils'),
				'~store': path.join(__dirname, 'src/core/store'),
				'~core': path.join(__dirname, 'src/core'),
				'~types': path.join(__dirname, 'types')
			},
			fallback: {
				assert: require.resolve('assert'),
				path: require.resolve('path-browserify'),
				crypto: require.resolve('crypto-browserify')
			}
		},

		optimization: {
			splitChunks: {
				chunks: 'all'
			}
		},

		devtool: mode === 'development' ? 'source-map' : false
	};

	if (mode === 'development') {
		config.devServer = {
			historyApiFallback: true,
			static: path.join(__dirname, 'dist'),
			// publicPath: 'http://localhost:9000',
			port: process.env.GD_WEB_SERVER_PORT,
			open: true
		};

		// just uncomment this & the include above to auto-generate the bundle analyzer treemap. It'll show up when
		// running `npm run start`
		// config.plugins.push(new BundleAnalyzerPlugin());
	}

	if (mode === 'production') {
		config.optimization.minimizer = [new TerserPlugin()];
		config.optimization.minimize = true;
	}

	return config;
};
