const { resolve } = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const CopyPlugin = require('copy-webpack-plugin')

const examplePath = resolve(__dirname, 'example')
const exampleDistPath = resolve(__dirname, 'example-dist')

const common = {
  context: examplePath,
  entry: './index.js',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  output: {
    filename: 'bundle.js'
  }
}

if (process.env.NODE_ENV === 'production') {
  module.exports = merge(common, {
    mode: 'production',
    output: {
      path: exampleDistPath
    },
    plugins: [
      new CopyPlugin([
        {
          from: resolve(examplePath, 'index.html'),
          to: resolve(exampleDistPath, 'index.html')
        }
      ])
    ]
  })
} else {
  module.exports = merge(common, {
    mode: 'development',
    output: {
      path: examplePath
    },
    devtool: 'inline-source-map',
    devServer: {
      contentBase: examplePath,
      hot: true
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  })
}
