/* eslint-env node */

const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WorkerPlugin = require('worker-plugin')
const { version } = require('./package.json')

const distFolder = path.join(__dirname, 'dist')

module.exports = {
  mode: 'development',
  entry: [
    '@babel/polyfill',
    './web/index.js'
  ],
  output: {
    path: distFolder,
    filename: 'bundle.js'
  },
  plugins: [
    new CopyWebpackPlugin([
      { context: './web', from: '*.html' },
      { context: './web', from: '*.css' }
    ]),
    new HtmlWebpackPlugin({
      template: './web/index.html',
      version
    }),
    new WorkerPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  },
  devtool: 'source-map',
  devServer: {
    contentBase: distFolder
  }
}