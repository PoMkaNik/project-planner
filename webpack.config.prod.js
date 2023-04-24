/* eslint-disable no-undef */
const path = require('path');
const CleanPlugin = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'assets', 'scripts'),
    filename: '[contenthash].js',
    publicPath: 'assets/scripts/',
  },
  devtool: 'cheap-source-map',
  plugins: [new CleanPlugin.CleanWebpackPlugin()],
};
