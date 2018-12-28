const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const HappyPack = require('happypack')
const os = require('os')
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })

function resolve(relatedPath) {
  return path.join(__dirname, relatedPath)
}

const webpackConfigBase = {
  entry: {
    client: resolve('../app/client.js'),
  },
  output: {
    path: resolve('../dist'),
    filename: '[name].[hash:4].js',
    chunkFilename: 'chunks/[name].[hash:4].js',
  },
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      '@app': path.join(__dirname, '../app'),
      '@actions': path.join(__dirname, '../app/redux/actions'),
      '@reducers': path.join(__dirname, '../app/redux/reducers'),
      '@apis': path.join(__dirname, '../app/apis'),
      '@components': path.join(__dirname, '../app/components'),
      '@configs': path.join(__dirname, '../app/configs'),
      '@config': path.join(__dirname, '../app/configs/config.js'),
      '@ajax': path.join(__dirname, '../app/configs/ajax.js'),
      '@reg': path.join(__dirname, '../app/configs/regular.config.js'),
      '@images': path.join(__dirname, '../app/images'),
      '@middleware': path.join(__dirname, '../app/middleware'),
      '@pages': path.join(__dirname, '../app/pages'),
      '@styles': path.join(__dirname, '../app/styles'),
      '@tableList': path.join(__dirname, '../app/components/tableList/tableList.js'),
    },
  },
  resolveLoader: {
    moduleExtensions: ['-loader']
  },
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        include: [resolve('../app')],
        loader: 'happypack/loader?id=happyBabel',
      },
      {
        test: /\.(css|less)$/,
        // exclude: /node_modules/,
        include: [
          resolve('../app/styles'),
          resolve('../app/components'),
          resolve('../node_modules/antd'),
          resolve('../node_modules/draft-js'),
        ],
        loader: ExtractTextPlugin.extract({fallback: 'style', use: 'happypack/loader?id=happyStyle'}),
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        exclude: /node_modules/,
        include: [resolve('../app/images')],
        loader: 'url',
        options: {
          limit: 8192,
          name: 'img/[name].[hash:4].[ext]'
        }
      },
      {
        test: /\.(woff|eot|ttf|svg|gif)$/,
        loader: 'url',
        options: {
          limit: 8192,
          name: 'font/[name].[hash:4].[ext]'
        }
      },
    ],
  },
  plugins: [
    new HappyPack({
      id: 'happyBabel',
      loaders: [{
        loader: 'babel?cacheDirectory=true',
      }],
      //Représente un pool de processus partagé, c'est-à-dire que plusieurs instances HappyPack utilisent des sous-processus dans le même pool de processus partagé pour traiter des tâches afin d'éviter une utilisation excessive des ressources.
      threadPool: happyThreadPool,
      //Autoriser HappyPack à générer des journaux
      verbose: true,
    }),
    new HappyPack({
      //Utilisez id pour identifier happypack afin de gérer les fichiers de classe là-bas.
      id: 'happyStyle',
      //Comment gérer le même usage que le chargeur
      loaders: [ 'css-loader?sourceMap=true', 'less-loader?sourceMap=true' ],
      //Représente un pool de processus partagé, c'est-à-dire que plusieurs instances HappyPack utilisent des sous-processus dans le même pool de processus partagé pour traiter des tâches afin d'éviter une utilisation excessive des ressources.
      threadPool: happyThreadPool,
      //Autoriser HappyPack à générer des journaux
      verbose: true,
    }),
    // Extraction css
    new ExtractTextPlugin('style.[hash:4].css'),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common', // Nom du fichier d'entrée
      filename: 'common.[hash:4].js', // Nom du fichier emballé
      minChunks: function (module, count) {
        return module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(resolve('../node_modules')) === 0
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      async: 'async-common',
      minChunks: 3,
    }),
  ]
}

module.exports = webpackConfigBase
