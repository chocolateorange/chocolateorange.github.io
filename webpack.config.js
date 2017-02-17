'use strict';

const path = require('path');

const webpack = require('webpack');

const uglifySaveLicense = require('uglify-save-license');

module.exports = function(env) {
  const baseConfig = {

    context: __dirname,

    target: 'web',

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

  };

  baseConfig.plugins = [
    new webpack.NoEmitOnErrorsPlugin,
    new webpack.optimize.AggressiveMergingPlugin,
    new webpack.BannerPlugin({
      banner: [
      '@license Copyright(c) 2016 sasa+1',
      'https://github.com/chocolateorange/chocolateorange.github.io',
      'Released under the MIT license.',
      ].join('\n'),
      entryOnly: true,
      raw: false,
    }),
  ];

  if (process.env.NODE_ENV === 'production') {
    baseConfig.plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        output: {
          comments: uglifySaveLicense,
        },
      })
    );
  }

  return [
    Object.assign({}, baseConfig, {
      entry: {
        'preload': './javascript/includes/preload.js',
      },
      output: {
        path: `${__dirname}/_includes/`,
        publicPath: './',
        filename: '[name].js',
        chunkFilename: 'chunk-[id]-[hash].js',
        library: ['[name]'],
        libraryTarget: 'var',
      },
      module: {
        exprContextCritical: false,
      },
    }),
    Object.assign({}, baseConfig, {
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
    }),
  ];
};
