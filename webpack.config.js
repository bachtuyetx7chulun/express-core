const path = require('path')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

module.exports = {
  mode: 'development',
  context: path.resolve(__dirname, 'src'),
  entry: './index',
  output: {
    path: path.join(__dirname, 'temp'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\\.tsx?$/,
        exclude: /^node_modules/,
        loader: 'ts-loader',
        options: {
          configFile: 'tsconfig.json',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: 'tsconfig.json',
        logLevel: 'error',
        extensions: ['.ts'],
        mainFields: ['browser', 'main', 'server'],
      }),
    ],
  },
}
