const TerserJSPlugin = require("terser-webpack-plugin")
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")

module.exports = {
  entry: {
    'tmm-web-audio-player': './app/App.jsx',
  },
  devtool: 'source-map',
  mode: 'development',
  output: {
    path: __dirname + '/public/v1',
    filename: '[name].js',
    library: 'TMMWebAudioPlayer',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  performance: {
    maxEntrypointSize: 400000,
    maxAssetSize: 400000
  },
  optimization: {
    minimizer: [
      new TerserJSPlugin({}),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: "[name].css", chunkFilename: "[id].css" }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-react', '@babel/preset-env']
        }
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {loader: "css-loader", options: {url: false}},
          "sass-loader"
        ]
      }
    ]
  },
  watchOptions: {
    ignored: /node_modules/,
  },
}
