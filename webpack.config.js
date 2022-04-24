const HtmlWebpackPlugin = require('html-webpack-plugin');

const env = process.env.NODE_ENV;

const plugins = [];
if (env !== 'production') {
  plugins.push(
    new HtmlWebpackPlugin({
      filename: 'index.html',
    })
  );
}

module.exports = {
  mode: env === 'production' ? 'production' : 'development',
  entry: './core/index.ts',
  output: {
    filename: 'index.js',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [{
      test: /.ts$/,
      loader: 'ts-loader',
    }]
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins,
}
