const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env) => {
  const buildPath = path.resolve(__dirname, 'public');
  console.log('env', env);

  return {
    entry: [
      './src/index.js', // your app's entry point
    ],
    mode: 'production',
    output: {
      filename: '[name].[hash:20].js',
      path: buildPath,
      publicPath: '/'
    },
    devtool: 'source-map',
    resolve: {
      modules: ['node_modules', 'src'],
      extensions: ['.js', '.jsx']
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          include: path.resolve(__dirname, "src"),
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [
                  ["@babel/preset-env", {
                    "targets": {
                      "browsers": ["last 4 versions", "safari >= 7", "IE 11"]
                    }
                  }],
                ]
              },
            },
          ],
        },

        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: { minimize: true }
            },
            {
              // Runs compiled CSS through postcss for vendor prefixing
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            },
            {
              // compiles Sass to CSS
              loader: 'sass-loader',
              options: {
                outputStyle: 'expanded',
                sourceMap: true,
                sourceMapContents: true
              }
            }
          ]
        },
        {
          test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
          exclude: /(node_modules|bower_components)/,
          loader: "file-loader"
        },
        {
          test: /\.(woff|woff2)$/,
          exclude: /(node_modules|bower_components)/,
          loader: "file-loader?prefix=font/&limit=5000"
        },
        {
          test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
          exclude: /(node_modules|bower_components)/,
          loader: "file-loader?limit=10000&mimetype=application/octet-stream"
        },
        {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
          exclude: /(node_modules|bower_components)/,
          loader: "file-loader?limit=10000&mimetype=image/svg+xml"
        },
        {
          // Load all images as base64 encoding if they are smaller than 8192 bytes
          test: /\.(png|jpg|gif)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                // On development we want to see where the file is coming from, hence we preserve the [path]
                name: '[path][name].[ext]?hash=[hash:20]',
                limit: 8192
              }
            }
          ]
        }
      ],
    },
    plugins: [
      new CleanWebpackPlugin(buildPath),

      // new webpack.DefinePlugin({
      //   'process.market': JSON.stringify(env.market),
      //   'process.stage': JSON.stringify(env.stage),
      // }),
      new MiniCssExtractPlugin({
        filename: 'style.[hash:20].css'
      }),
      new HtmlWebpackPlugin({
        template: `./src/template.html`,
        files: {
          css: ['style.css'],
          js: ['main.js'],
        }
      }),
      new CopyWebpackPlugin([
        { from: './src/assets', to: './assets', cache: true },
        // { from: './src/images', to: './images', cache: true },
        { from: './src/favicon.ico', to: './', cache: true },
        { from: './src/site.webmanifest', to: './', cache: false },
        { from: './src/browserconfig.xml', to: './', cache: true },
        // { from: './src/sitemap.xml', to: './', cache: true },
      ]),
    ]
  };
};
