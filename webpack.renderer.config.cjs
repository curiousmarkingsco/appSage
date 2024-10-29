const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/app/renderer.js', // Entry point for the renderer process
  output: {
    path: path.resolve(__dirname, 'dist'), // Output bundled files into the dist folder
    filename: 'renderer.js', // Output filename for the renderer process
  },
  target: 'web', // Target is a web environment
  module: {
    rules: [
      {
        test: /\.js$/, // Transpile JS files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'], // Transpile modern JavaScript
          },
        },
      },
      {
        test: /\.css$/, // Handle CSS files
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|svg|gif|ico|mp3|mp4|webmanifest)$/, // Handle images and media
        type: 'asset/resource',
        generator: {
          filename: 'assets/[name][ext]', // Output to assets folder
        },
      },
      {
        test: /\.(woff|woff2|ttf|eot)$/, // Handle font files
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name][ext]', // Output to assets/fonts folder
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/app/index.html', // Use your existing HTML template
      filename: 'index.html', // Output to the dist directory
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: './src/app/assets', to: 'assets' }, // Copy assets (icons, images, etc.)
        { from: './src/app/placeholder_media', to: 'placeholder_media' }, // Copy placeholder media
        { from: './src/app/preload.js', to: 'preload.js' }, // Copy preload.js
        { from: './src/app/styles.css', to: 'styles.css' }, // Copy CSS file
      ],
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css', // Extract bundled CSS into its own file
    }),
  ],
  resolve: {
    extensions: ['.js', '.css'], // Resolve these file extensions
  },
};
