const path = require('path');

module.exports = {
  entry: './index.ts',
  target: "node",
  module: {
    rules: [
      { test: /.tsx?$/, loader: 'ts-loader' },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto'
      }
    ],
  },
  output: {
    filename: './bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['*', '.mjs', '.js','.ts', '.tsx', '.js']
  }
}