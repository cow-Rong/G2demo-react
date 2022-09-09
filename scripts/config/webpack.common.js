const path = require('path')
const WebpackBar = require('webpackbar')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { PROJECT_PATH } = require('../constant')
const { isDevelopment, isProduction } = require('../env')

const getCssLoaders = (num) => {
  const cssLoaders = [
    isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
      options: {
        importLoaders: num,
        sourceMap: isDevelopment,
      }
    }
  ]

  isProduction && cssLoaders.push({
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        plugins: [
          isProduction && [
            'postcss-preset-env',
            {
              autoprefixer: {
                grid: true
              }
            }
          ]
        ]
      }
    }
  })

  return cssLoaders
}

module.exports = {
  entry: {
    app: path.resolve(PROJECT_PATH, './src/index.tsx')
  },
  resolve: {
    fallback: {
      "fs": false
    },
    extensions: ['.tsx', '.ts', '.js', '.json'],
    alias: {
      'src': path.resolve(PROJECT_PATH, './src'),
      'components': path.resolve(PROJECT_PATH, './src/components'),
      'utils': path.resolve(PROJECT_PATH, './src/utils'),
      'scripts': path.resolve(PROJECT_PATH, './src/scripts')
    }
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          presets: [
            "@babel/preset-env",
            ["@babel/preset-react", { "runtime": "automatic" }],
            "@babel/preset-typescript",
          ],
        },
        exclude: [/node_modules/, /lib/, /plugins/,/public/,/assets/],
      },
      {
        test: /\.css$/,
        use: [...getCssLoaders(1)]
      },
      {
        test: /\.less$/,
        exclude: /\.module\.(less)$/,
        use: [
          ...getCssLoaders(2),
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                modifyVars: {
                  'primary-color': '#55a722',
                  'link-color': '#55a722',
                  'border-radius-base': '2px',
                },
                javascriptEnabled: true
              },
              sourceMap: isDevelopment,
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        exclude: /\.module\.(scss)$/,
        use: [
          ...getCssLoaders(2),
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDevelopment,
            }
          }
        ]
      },
      {
        test: /\.module\.scss$/,
        use: [
          ...getCssLoaders(2),
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDevelopment,
            }
          }
        ]
      },
      {
        test: /\.module\.less$/,
        use: [
          ...getCssLoaders(2),
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true
              },
              sourceMap: isDevelopment,
            }
          }
        ]
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024,
          },
        },
      },
      {
        test: /\.(ico|eot|svg|ttf|woff|woff2?)$/,
        type: 'asset/resource',
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(PROJECT_PATH, './public/index.html'),
      inject: true,
    }),
    new WebpackBar(),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: path.resolve(PROJECT_PATH, './tsconfig.json'),
        memoryLimit: 8888,
      },
    }),
    new CopyWebpackPlugin(
      {
        patterns: [
          {
            from: path.resolve(PROJECT_PATH, './src/assets'),
            to: path.resolve(PROJECT_PATH, './dist/assets'),
          },
          {
            from: path.resolve(PROJECT_PATH, './lib'),
            to: path.resolve(PROJECT_PATH, './dist/lib'),
          }
        ]
      }
    ),
  ],
}