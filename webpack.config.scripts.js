'use strict';

const path = require('path');

const webpack = require('webpack');

const uglifySaveLicense = require('uglify-save-license');

module.exports = {

  context: __dirname,

  target: 'web',

  entry: {
    'error-track': './javascript/scripts/error-track/index.js',
    'tag': './javascript/scripts/tag/index.js',
  },

  output: {
    path: `${__dirname}/js/`,
    publicPath: './',
    filename: '[name].js',
    chunkFilename: 'chunk-[id]-[hash].js',
  },

  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.html?$/,
        use: [
          { loader: 'html-loader' },
        ],
      },
      {
        exclude: /node_modules/,
        test: /\.js$/,
        use: [
          { loader: 'babel-loader' },
        ],
      },
    ],
  },

  node: {
    Buffer: false,
    process: false,
  },

  resolve: {
    extensions: [
      '.js',
      '.html',
    ],
  },

  plugins: [
    new webpack.NoEmitOnErrorsPlugin,
    new webpack.optimize.AggressiveMergingPlugin,
  ].concat(
    (process.argv.some(
      (arg) => /^(?:-p|--optimize-minimize)$/.test(arg)
    )) ? [
      new webpack.optimize.UglifyJsPlugin({
        output: {
          comments: uglifySaveLicense,
        },
      }),
    ] : [
      /* none */
    ]
  ).concat([
    new webpack.BannerPlugin({
      banner: [
        '@license Copyright(c) 2016 sasa+1',
        'https://github.com/chocolateorange/chocolateorange.github.io',
        'Released under the MIT license.',
      ].join('\n'),
      entryOnly: true,
      raw: false,
    }),
  ]),

};
