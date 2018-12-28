
const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const webpackConfigBase = require('./webpack.prod.config')
const HtmlWebpackPlugin = require('html-webpack-plugin')

function resolve(relatedPath) {
  return path.join(__dirname, relatedPath)
}

const webpackConfigProd = {
  plugins: [
    // Définir les variables d'environnement comme environnement de développement
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('testing'),
      IS_DEVELOPMETN: false,
    }),
    // Injecter les ressources empaquetées dans le fichier html
    new HtmlWebpackPlugin({
      template: resolve('../app/index.html'),
      mapConfig:'http://192.168.0.1/map_config.js'
    }),
  ],
}

module.exports = merge(webpackConfigBase, webpackConfigProd)
