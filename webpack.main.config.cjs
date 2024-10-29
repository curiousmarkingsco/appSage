const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './src/main.js', // Entry point for the main process
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js', // Output bundled file
  },
  target: 'electron-main', // Target Electron main process
  externals: [nodeExternals()], // Exclude node_modules from being bundled
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Transpile modern JavaScript
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
  },
  node: {
    __dirname: false,
    __filename: false,
  },
};
