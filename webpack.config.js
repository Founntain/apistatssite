const path = require('path');

module.exports = {
  entry: {
    "ApiSide": './src/index.ts'
  },
  watch: true,
  mode: "development",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname),
    library: '[name]'
  },
};