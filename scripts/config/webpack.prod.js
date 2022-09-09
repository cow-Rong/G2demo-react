const { merge } = require('webpack-merge')
const path = require('path')
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require("terser-webpack-plugin")
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const common = require('./webpack.common')
const { PROJECT_PATH } = require('../constant')

const PUBLIC_PATH = '/WebApi/visual_MIDP/static/dist/';

module.exports = merge(common, {
  mode: 'production',
  devtool: false,
  output: {
    filename: '[name].[contenthash:8].js',
    path: path.resolve(PROJECT_PATH, './dist'),
    chunkFilename: "[name].[contenthash:8].chunk.js",
    publicPath: PUBLIC_PATH,
    assetModuleFilename: 'images/[name].[contenthash:8].[ext]',
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].chunk.css',
    }),
    // Minify the code.
    // new UglifyJsPlugin({
    //   uglifyOptions: {
    //     parse: {
    //       ecma: 8,
    //     },
    //     compress: {
    //       ecma: 5,
    //       warnings: false,
    //       comparisons: false,
    //     },
    //     mangle: {
    //       safari10: true,
    //     },
    //     output: {
    //       ecma: 5,
    //       comments: false,
    //       ascii_only: true,
    //     },
    //   },
    //   parallel: true,
    //   cache: true,
    //   sourceMap: true,
    // }),
    // 该插件将把给定的 JS 或 CSS 文件添加到 webpack 配置的文件中，并将其放入资源列表 html webpack插件注入到生成的 html 中。
    new AddAssetHtmlPlugin([
      {
        // 要添加到编译中的文件的绝对路径，以及生成的HTML文件。支持globby字符串
        filepath: 'F:/MIDP/customcomponents/dist/custom-elements-isop/runtime.js',
        // 文件输出目录
        outputPath: 'custom-elements-isop',
        // 脚本或链接标记的公共路径
        publicPath: path.join(PUBLIC_PATH, 'custom-elements-isop')
        // publicPath: 'custom-elements-isop'
      },
      {
        filepath: 'F:/MIDP/customcomponents/dist/custom-elements-isop/polyfills.js',
        // 文件输出目录
        outputPath: 'custom-elements-isop',
        // 脚本或链接标记的公共路径
        publicPath: path.join(PUBLIC_PATH, 'custom-elements-isop')
        // publicPath: 'custom-elements-isop'
      },
      {
        filepath: 'F:/MIDP/customcomponents/dist/custom-elements-isop/main.js',
        // 文件输出目录
        outputPath: 'custom-elements-isop',
        // 脚本或链接标记的公共路径
        publicPath: path.join(PUBLIC_PATH, 'custom-elements-isop')
        // publicPath: 'custom-elements-isop'
      }
    ]),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        exclude:[/lib/,/dist/],
        extractComments: false,
        terserOptions: {
          compress: { pure_funcs: ['console.log'] },
        }
      }),
      new CssMinimizerPlugin(),
    ],
    runtimeChunk: 'single',
    moduleIds: 'deterministic',
    splitChunks: {
      chunks: 'all',
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  }
})