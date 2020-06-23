/* eslint-env node */

const path = require('path')
const srcPath = path.join(__dirname, 'src')
const distPath = path.join(__dirname, 'dist')

module.exports = {
  mode: 'development', // process.env.NODE_ENV,
  bail: true,
  entry: ['./src/index.js'],
  resolve: {
    extensions: ['.js']
  },
  output: {
    library: 'IvhBaseComponents',
    libraryTarget: 'umd',
    path: distPath,
    filename: 'ivh-base-components.js'
  },
  externals: {
    react: {
      root: 'React',
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react'
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'react-dom'
    },
    '@ivantagehealth/ivh-base-components': '@ivantagehealth/ivh-base-components'
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.js$/,
            loader: 'babel-loader'
          },
          {
            test: /\.css$/,
            use: [
              'style-loader',
              {
                loader: 'css-loader',
                options: {
                  importLoaders: 1
                }
              },
              'postcss-loader'
            ]
          }
        ]
      }
    ]
  }
}
