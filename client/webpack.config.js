const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file. *done*
// TODO: Add CSS loaders and babel to webpack. *done*

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      // added HtmlWebpackPlugin
      new HtmlWebpackPlugin({
        publicPath: './',
        template: './index.html',
        title: 'Just Another Text Editor'
      }), 
      // Added webpack pwa manifest
      new WebpackPwaManifest({
        name: 'Just Another Text Editor',
        short_name: 'J.A.T.E.',
        description: 'Takes notes with JavaScript syntax highlighting!',
        theme_color: '#225ca3',
        background_color: '#225ca3',
        publicPath: './',
        start_url: './',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: 96 /* [96, 128, 192, 256, 384, 512] */,
            destination: path.join("assets", "icons")
          },
        ]
      }),
      // added inject manifest
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'service-worker.js',
      }),
    ],

    module: {
      rules: [
        // added css loaders
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        // added babbel loaders
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
      ],
    },
  };
};
