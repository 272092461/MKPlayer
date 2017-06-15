var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'MKCanvas': resolve('src/js/MKCanvas'),
      'CommentSpaceAllocator': resolve('src/js/CommentSpaceAllocator'),
      'CommentParser': resolve('src/js/CommentParser'),
      'CommentLoader': resolve('src/js/CommentLoader'),
      'CommentBuilder': resolve('src/js/CommentBuilder'),
      'CommentManager': resolve('src/js/CommentManager'),
      'MKPlayer': resolve('src/js/MKPlayer'),
      'ControlBar': resolve('src/js/ControlBar'),
      'MKPlayer-view': resolve('src/js/MKPlayer-view'),
      'DataSender': resolve('src/js/DataSender'),
      'CommentSender': resolve('src/js/CommentSender'),
      'MKSocket': resolve('src/js/MKSocket'),
      'socketIO': 'socket.io-client',
      'require': resolve('src/js/require'),
      'run': resolve('src/js/run'),
      'Event': resolve('src/js/PlayerEvent')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}
