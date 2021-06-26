const path = require("path");
const common = require("./webpack.common");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

module.exports = merge(common, {
  mode: "development",
  output: {
    filename: "js/[name].bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    }),
    new CopyPlugin({
      patterns: [
        {
          from: './src/img/_sprite.svg',
          to: 'assets/img/', // relative path in output directory
        }
      ]
    }),
    new FaviconsWebpackPlugin('./src/img/favicon.ico'),
    new ExtractTextPlugin("style.css"),
    new SpriteLoaderPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [
            'css-loader',
            'sass-loader'
          ]
        })
      },
    ]
  }
});
