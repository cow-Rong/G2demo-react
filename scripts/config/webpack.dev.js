const { merge } = require('webpack-merge')
const path = require('path')
const webpack = require('webpack')
const common = require('./webpack.common')
const { PROJECT_PATH, SERVER_HOST, SERVER_PORT } = require('../constant')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

const PUBLIC_PATH = '/';

module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  target: 'web',
  output: {
    path: path.resolve(PROJECT_PATH, './dist'),
    filename: "[name].[contenthash:8].js",
    chunkFilename: "[name].[contenthash:8].chunk.js",
    publicPath: PUBLIC_PATH
  },
  devServer: {
    host: SERVER_HOST,
    port: SERVER_PORT,
    compress: true,
    open: true,
    hot: true,
    publicPath: PUBLIC_PATH,
    historyApiFallback: true,
    proxy: require('./proxy.conf')
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // 该插件将把给定的 JS 或 CSS 文件添加到 webpack 配置的文件中，并将其放入资源列表 html webpack插件注入到生成的 html 中。
    new AddAssetHtmlPlugin([
      {
        // 要添加到编译中的文件的绝对路径，以及生成的HTML文件。支持globby字符串
        filepath: 'F:/MIDP/customcomponents/dist/custom-elements-isop/runtime.js',
        // filepath: require.resolve(path.resolve(__dirname, '../../public/custom-elements-isop/runtime.js')),
        // 文件输出目录
        outputPath: 'custom-elements-isop',
        // 脚本或链接标记的公共路径
        publicPath: path.join(PUBLIC_PATH, 'custom-elements-isop')
        // publicPath: 'custom-elements-isop'
      },
      {
        filepath: 'F:/MIDP/customcomponents/dist/custom-elements-isop/polyfills.js',
        // filepath: require.resolve(path.resolve(__dirname, '../../public/custom-elements-isop/polyfills.js')),
        // 文件输出目录
        outputPath: 'custom-elements-isop',
        // 脚本或链接标记的公共路径
        publicPath: path.join(PUBLIC_PATH, 'custom-elements-isop')
        // publicPath: 'custom-elements-isop'
      },
      {
        filepath: 'F:/MIDP/customcomponents/dist/custom-elements-isop/main.js',
        // filepath: require.resolve(path.resolve(__dirname, '../../public/custom-elements-isop/main.js')),
        // 文件输出目录
        outputPath: 'custom-elements-isop',
        // 脚本或链接标记的公共路径
        publicPath: path.join(PUBLIC_PATH, 'custom-elements-isop')
        // publicPath: 'custom-elements-isop'
      },
    ]),
  ],
  optimization: {
    minimize: false,
    minimizer: [],
    splitChunks: {
      chunks: 'all',
      minSize: 0,
    },
  },
})