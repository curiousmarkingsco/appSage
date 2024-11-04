// webpack.base.config.cjs
const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/, // Transpile JS files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Common JS transpilation
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js'], // Common file extensions
  },
};
