const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    main: './src/pages/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js'
  },
  mode: 'development',
  devServer: {
    static: path.join(__dirname, 'dist'),
    port: 8080,
    open: true
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: '/node_modules/'
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 
          {
            loader: "css-loader",
            options: { importLoaders: 1 }
          },
          'postcss-loader'
        ],
      },
      {
        test: /\.html$/i,
        loader: 'html-loader'
      }
    ]
  }
}

