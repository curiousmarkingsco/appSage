// webpack.renderer.config.cjs
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.config.cjs');
const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(baseConfig, {
  entry: './src/render/renderer.js',
  output: {
    filename: 'renderer.js', // Output filename specific to Electron renderer
  },
  target: 'electron-renderer', // Electron renderer process target
  module: {
    rules: [
      {
        test: /\.css$/, // Handle CSS files, if needed
        use: ['style-loader', 'css-loader'], // Use style-loader for Electron instead of extracting CSS
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/app/render.html', // HTML template for the renderer
      filename: 'render.html', // Output to dist
    }),
  ],
  resolve: {
    extensions: ['.js', '.css'], // Handle JS and CSS extensions
  },
});
