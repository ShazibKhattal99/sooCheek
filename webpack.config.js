const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: "development", // Change to "production" for production builds
  entry: "./src/index.js", // Path to your main entry JS file
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory
    filename: '[name].[contenthash].js',  // Dynamic names to avoid collisions
  },
  
  optimization: {
    splitChunks: {
      chunks: "all", // Split code for optimization
    },
  },

  devServer: {
    static: path.join(__dirname, "public"), // Directory to serve static files from
    open: true, // Automatically open the browser
    port: 3000, // Port number
    hot: true, // Enable Hot Module Replacement (HMR)
    historyApiFallback: true, // For single-page applications, if using React Router
    // You can add other dev server configurations here if needed
  },

  plugins: [
    new CleanWebpackPlugin(), // Clean dist folder before each build
    new HtmlWebpackPlugin({
      template: './src/index.html', // Path to your HTML template
      filename: 'index.html', // Output filename in dist folder
      inject: 'body', // Inject JS at the end of the body
    }),
  ],

  module: {
    rules: [
      {
        test: /\.jsx?$/, // Targeting JS and JSX files
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.css$/, // This will apply to all .css files
        use: ['style-loader', 'css-loader'], // First apply css-loader, then style-loader
      },
      // Optional: For Sass/SCSS files
      // {
      //   test: /\.scss$/,
      //   use: ['style-loader', 'css-loader', 'sass-loader'],
      // },
    ],
  },

  resolve: {
    extensions: [".js", ".jsx", ".css"], // Resolve .js and .jsx extensions
  },
};
