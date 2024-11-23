const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: "development", //
  entry: "./src/index.js", // Path to your main entry JS file
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js'  // Dynamic names to avoid collisions
  }
,  

  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },

  devServer: {
    static: path.join(__dirname, "public"), // Directory to serve static files from
    open: true, // Automatically open the browser
    port: 3000, // Port number
    hot: true, // Enable Hot Module Replacement (HMR)
    historyApiFallback: true, // For single-page applications, if using React Router
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      chunks: ['main', 'vendor'], // Ensure it includes both the main app and vendor chunk
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/, // This should include .js and .jsx files
        exclude: /node_modules/,
         use: {
        loader: "babel-loader",
        options: {
          presets: [
            "@babel/preset-env", 
            "@babel/preset-react"
          ],
        },
      },
      },
      {
        test: /\.css$/, // This will apply to all .css files
        use: ['style-loader', 'css-loader'], // First apply css-loader, then style-loader
      },
    ],
  },

  resolve: {
    extensions: [".js", ".jsx",".css"], // Resolve .js and .jsx extensions
  },
};
