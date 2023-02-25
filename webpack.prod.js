const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin')

module.exports = {
  entry: './src/client/index.js',
  mode: 'production',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader"
        },
        {
            test: /\.scss$/, 
            use: ['style-loader', 'css-loader', 'sass-loader']
        },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
        template: "./src/client/views/index.html",
        filename: "./index.html",
    }),
    new CopyWebpackPlugin({
        patterns: [
        {from:'./src/client/assets/weatherIcons', to:'./assets/images/weatherIcons'} 
        ]
    }), 
    new CleanWebpackPlugin(),
    new WorkboxWebpackPlugin.GenerateSW(),
],
};