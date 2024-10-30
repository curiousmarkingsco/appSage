// webpack.config.cjs
const mainConfig = require('./webpack.main.config.cjs');
const rendererConfig = require('./webpack.renderer.config.cjs');

module.exports = [mainConfig, rendererConfig];
