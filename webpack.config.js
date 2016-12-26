const autoprefixer = require('autoprefixer')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const path = require('path')

const config = {
  entry: {
    app: ['./src/index']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true,
          presets: ['es2015'],
        }
      },
      {
        test:   /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', ['css-loader', 'postcss-loader', 'sass-loader'])
      },
      {
        test:   /\.css$/,
        loader: "style-loader!css-loader!postcss-loader"
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('style.css')
  ],
  postcss: [
    autoprefixer({
      browsers: ['last 2 versions']
    })
  ],
  resolve: {
    extensions: ['', '.js', '.scss'],
    root: [path.join(__dirname, './src')]
  },
  devServer: { inline: true },
  output: {
    filename: 'script.js',
    path: path.join(__dirname, './dist'),
    publicPath: '/dist'
  }
}

module.exports = config
