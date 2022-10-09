/* eslint-env node */

const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { version } = require('./package.json')

const BUILD_FOLDER = path.join(__dirname, 'build')

module.exports = {
  mode: 'production',
  entry: './web/index.js',
  output: {
    path: BUILD_FOLDER,
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
    })
  ],
  devtool: 'source-map',
  devServer: {
    contentBase: BUILD_FOLDER
  }
}
