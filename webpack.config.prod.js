import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
  debug: true,
  devtool: 'source-map',
  noInfo: false,
  entry: {
    main: path.resolve(__dirname, 'src/index'),
    vendor: path.resolve(__dirname, 'src/vendor')
  },
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].[chunkhash].js'
  },
  mode: 'development',
  plugins: [
    // generate an external css file with hash in filename
    new ExtractTextPlugin('[name].[contenthash].css'),
    // hash files using MD5 so that their filenames change when their content changes 
    // so that they will be re-downloaded even if web server sets long expiration dates
    new WebpackMd5Hash(), 
    // use CommonsChunkPlugin to tell webpack to create 
    // a separate bundle for vendor libraries so they can be cached separately
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),

    // Create HTML file that includes reference to bundled JS
    new HtmlWebpackPlugin({
      template:'src/index.html',
      minify: {
          removeComments:true,
          collapseWhitespace:true,
          removeRedundantAttributes:true,
          useShortDoctype:true,
          removeEmptyAttributes:true,
          removeStyleLinkTypeAttributes:true,
          keepClosingSlash:true,
          minifyJS:true,
          minifyCSS:true,
          minifyURLs:true
      },
      inject:true
    }),
    // Minify JS
    new webpack.optimize.UglifyJsPlugin(),
    // Eliminate duplicate packages when generating bundle
    new webpack.optimize.DedupePlugin()
  ],
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
      {test: /\.css$/, loader: ExtractTextPlugin.extract('css?sourceMap')}
    ]
  }
} 