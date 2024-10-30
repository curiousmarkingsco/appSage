// webpack.main.config.cjs
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.config.cjs');
const nodeExternals = require('webpack-node-externals');

module.exports = merge(baseConfig, {
  entry: './src/main.js',
  output: {
    filename: 'main.js', // Specific to main process
  },
  target: 'electron-main',
  externals: [nodeExternals()], // Exclude node_modules
  // No need to repeat module.rules or resolve.extensions
  // They are inherited from the baseConfig
});
