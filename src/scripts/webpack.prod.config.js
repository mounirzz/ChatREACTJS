const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const webpackConfigBase = require('./webpack.base.config')
const Copy = require('copy-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const HtmlWebpackPlugin = require('html-webpack-plugin')
// Supprimer le répertoire dist avant de construire
const CleanWebpackPlugin = require('clean-webpack-plugin')
// Plugin de compression multicœur
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')

function resolve(relatedPath) {
  return path.join(__dirname, relatedPath)
}

const webpackConfigProd = {
  plugins: [
    // Définir les variables d'environnement comme environnement de développement
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      IS_DEVELOPMETN: false,
    }),
    // Injecter les ressources empaquetées dans le fichier html
    new HtmlWebpackPlugin({
      template: resolve('../app/index.html'),
      mapConfig:'http://192.168.0.1/map_config.js'
    }),
    /* webpack Livré avec code de compression * /
    // new webpack.optimize.UglifyJsPlugin({ minimize: true }),
    /* Code de compression multicœur */
    new ParallelUglifyPlugin({
      cacheDir: '.cache/',
      uglifyJS:{
        output: {
          comments: false
        },
        compress: {
          warnings: false
        }
      }
    }),
    // Code d'analyse
    // new BundleAnalyzerPlugin({ analyzerPort: 3011 }),
    new Copy([
      { from: './app/images', to: './images' },
    ]),
    new CleanWebpackPlugin(['dist'],{
      root: path.join(__dirname, '../'),
      verbose:false,
      // exclude:['img']//Ne pas supprimer les ressources statiques img
    }),
  ],
}

module.exports = merge(webpackConfigBase, webpackConfigProd)
