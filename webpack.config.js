/* eslint-disable no-undef */
const path = require('path');
const CleanPlugin = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'assets', 'scripts'),
    filename: 'app.js',
    publicPath: 'assets/scripts/',
  },
  devtool: 'cheap-module-eval-source-map',
  plugins: [new CleanPlugin.CleanWebpackPlugin()],
  devServer: {
    contentBase: './',
  },
};
