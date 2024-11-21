const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    renderer: {
      import: [
        './src/app/renderer.js',
        './src/app/render/tailwind.js',
        './src/app/render/tailwind.config.js',
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
        './src/app/render/remote_save.js',
        './src/app/render/main.js',
        './src/app/render/preview/main.js',
        './src/app/render/editor/main.js',
        './src/app/render/index/main.js',
        ...glob.sync('./src/app/render/editor/components/**/*.js').map(file => path.resolve(__dirname, file)),
      ]
    }
  },
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
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/app/index.html', // Use your existing HTML template
      filename: 'index.html', // Output to the dist directory
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: './src/app/styles.css', to: 'styles.css' }, // Copy CSS file
        { from: './src/app/tailwind-output.css', to: 'tailwind-output.css' },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css', // Extract bundled CSS into its own file
    }),
  ],
  resolve: {
    extensions: ['.js', '.css'], // Resolve these file extensions
  }
};
