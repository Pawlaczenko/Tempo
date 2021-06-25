const path = require("path");

module.exports = {
  // entry: {
  //   main: 'babel-polyfill', './src/js/index.js'
  // },
  entry: ['babel-polyfill', './src/js/index.js'],
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ["html-loader"]
      },
      {
        test: /\.(ico|svg|png|jpe?g|gif)$/i,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "assets/img/",
            publicPath: 'assets/img/'
          }
        }
      },
      {
        test: /\.svg$/i,
        include: /.*_sprite\.svg/,
        use: [
          {
            loader: 'svg-sprite-loader',
            options: {
              publicPath: 'assets/img/',
            }
          },
        ],
      },
    ]
  },
  externals: {
    moment: 'moment'
  }
};
