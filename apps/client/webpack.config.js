const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

// this defaults to the ESM version, so it pulls from the direct location
const { clientConfig } = require('@generatedata/config');

// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

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
      chunkFilename: mode === 'development' ? '[name].js' : '[name]-[fullhash].js',
      filename: mode === 'development' ? '[name].js' : '[name]-[fullhash].js'
    },

    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: [{ loader: 'ts-loader' }]
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
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        }
      ]
    },

    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(mode)
      }),
      new ESLintPlugin({
        extensions: ['js', 'ts']
      }),
      new CaseSensitivePathsPlugin(),
      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'src/index.html')
      }),
      new webpack.ProvidePlugin({
        process: require.resolve('process/browser')
      }),

      // the @generatedata/plugins package contains the web workers. This copies them to the app dist folder so
      new CopyPlugin({
        patterns: [{ from: './node_modules/@generatedata/plugins/dist/workers/*', to: 'dist/workers' }]
      })
    ],

    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
      alias: {
        '~components': path.join(__dirname, 'src/components'),
        '~utils': path.join(__dirname, 'src/utils'),
        '~store': path.join(__dirname, 'src/store'),
        '~core': path.join(__dirname, 'src/core'),
        '~types': path.join(__dirname, 'types')
      },
      fallback: {
        assert: require.resolve('assert'),
        child_process: false,
        crypto: require.resolve('crypto-browserify'),
        fs: false,
        os: require.resolve('os-browserify/browser'),
        path: require.resolve('path-browserify'),
        stream: require.resolve('stream-browserify'),
        vm: require.resolve('vm-browserify'),
        zlib: require.resolve('browserify-zlib')
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
      port: clientConfig.webServer.GD_WEB_SERVER_PORT,
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
