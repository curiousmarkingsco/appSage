// webpack.renderer.config.cjs
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.config.cjs');
const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(baseConfig, {
  entry: {
    renderer: {
      import: [
        './src/app/render/_globals.js',
        './src/app/render/load.js',
        './src/app/render/editor/components/main.js',
        './src/app/render/editor/grid.js',
        './src/app/render/editor/style/grid.js',
        './src/app/render/editor/container.js',
        './src/app/render/editor/style/container.js',
        './src/app/render/editor/component.js',
        './src/app/render/editor/column.js',
        './src/app/render/editor/style/column.js',
        './src/app/render/editor/content.js',
        './src/app/render/editor/sidebar.js',
        './src/app/render/editor/style.js',
        './src/app/render/editor/save.js',
        './src/app/render/editor/load.js',
        './src/app/render/editor/settings.js',
        './src/app/render/editor/media.js',
        './src/app/render/editor/responsive.js',
        './src/app/render/main.js',
        './src/app/render/preview/main.js',
        './src/app/render/editor/main.js',
        './src/app/render/index/main.js',
        ...glob.sync('./src/app/render/editor/components/**/*.js').map(file => path.resolve(__dirname, file)),
      ],
    },
  },
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
