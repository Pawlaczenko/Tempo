const path = require("path");

module.exports = {
  entry: {
    main: "./src/js/index.js"
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ["html-loader"]
      },
      {
        test: /\.(ico|svg|png|jpg|gif)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[hash].[ext]",
            outputPath: "assets/img",
            // publicPath: '/'
          }
        }
      },
    ]
  },
  externals: {
    moment: 'moment'
  }
};
