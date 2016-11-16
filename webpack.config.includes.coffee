path = require 'path'

webpack = require 'webpack'

module.exports =

  context: __dirname

  target: 'web'

  entry:
    preload: './javascript/includes/preload.js'

  output:
    path: './_includes/'
    publicPath: './'
    filename: '[name].js'
    chunkFilename: 'chunk-[id]-[hash].js'
    library: ['[name]']
    libraryTarget: 'var'

  resolveLoader:
    root: path.join(__dirname, 'node_modules')

  module:
    loaders: [
      { test: /\.html?$/, exclude: /node_modules/, loader: 'html'  }
      { test: /\.js$/,    exclude: /node_modules/, loader: 'babel' }
    ]

  node:
    Buffer: false
    process: false

  resolve:
    extensions: [
      ''
      '.js'
      '.json'
      '.html'
    ]
    modulesDirectories: [
      'node_modules'
    ]

  plugins: [
    new webpack.NoErrorsPlugin
    new webpack.IgnorePlugin(/vertx/)
    new webpack.optimize.OccurenceOrderPlugin
    new webpack.optimize.DedupePlugin
    new webpack.optimize.AggressiveMergingPlugin
  ].concat(
    if process.argv.some (arg) ->
      /^(?:-p|--optimize-minimize)$/.test(arg)
    then [
    # new webpack.DefinePlugin(
    # )
      new webpack.optimize.UglifyJsPlugin(
        compress:
          pure_funcs: [
            'log'
          ]
        output:
          comments: require('uglify-save-license')
      )
    ]
    else [
      new webpack.DefinePlugin(
        log: ->
          if console?
            # for IE8 and IE9
            if typeof console.log is 'object'
              Function::apply.call(console.log, console, arguments)
            # for other browsers
            else
              console.log.apply(console, arguments)
          return
      )
    ]
  ).concat([
    new webpack.BannerPlugin(
      '''
      @license Copyright(c) 2016 sasa+1
      https://github.com/chocolateorange/chocolateorange.github.io
      Released under the MIT license.
      '''
    ,
      options:
        raw: false
        entryOnly: true
    )
  ])
