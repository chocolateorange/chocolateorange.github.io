'use strict';

const path = require('path');

const webpack = require('webpack')

module.exports = {

  context: __dirname,

  target: 'web',

  entry: {
    preload: './javascript/includes/preload.js',
  },

  output: {
    path: './_includes/',
    publicPath: './',
    filename: '[name].js',
    chunkFilename: 'chunk-[id]-[hash].js',
    library: ['[name]'],
    libraryTarget: 'var',
  },

  resolveLoader: {
    root: path.join(__dirname, 'node_modules'),
  },

  module: {
    loaders: [
      { test: /\.html?$/, exclude: /node_modules/, loader: 'html'  },
      { test: /\.js$/,    exclude: /node_modules/, loader: 'babel' },
    ],
  },

  node: {
    Buffer: false,
    process: false,
  },

  resolve: {
    extensions: [
      '',
      '.js',
      '.html',
    ],
    modulesDirectories: [
      'node_modules',
    ],
  },

  plugins: [
    new webpack.NoErrorsPlugin,
    new webpack.IgnorePlugin(/vertx/),
    new webpack.optimize.OccurenceOrderPlugin,
    new webpack.optimize.DedupePlugin,
    new webpack.optimize.AggressiveMergingPlugin,
  ].concat(
    (process.argv.some(arg => /^(?:-p|--optimize-minimize)$/.test(arg))) ? [
      // new webpack.DefinePlugin(
      // ),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          pure_funcs: [
            'log',
          ],
        },
        output: {
          comments: require('uglify-save-license'),
        },
      }),
    ] : [
      new webpack.DefinePlugin({
        log: function() {
          if (typeof console !== 'undefined') {
            if (typeof console.log === 'object') {
              // for IE8 and IE9
              Function.prototype.apply.call(console.log, console, arguments);
            } else {
              // for other browsers
              console.log.apply(console, arguments);
            }
          }
        },
      }),
    ]
  ).concat([
    new webpack.BannerPlugin([
      '@license Copyright(c) 2016 sasa+1',
      'https://github.com/chocolateorange/chocolateorange.github.io',
      'Released under the MIT license.',
    ].join('\n'), {
      raw: false,
      entryOnly: true,
    }),
  ]),

};
