const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts')

const MODE = "production";
const enabledSourceMap = MODE === "development";

module.exports = {
  mode: MODE,
  entry: {
    // keyにはスラッシュ区切りで名前を指定することで、ディレクトリ階層を指定できる（`ディレクトリ名/ファイル名`）
    'stylesheets/application': './src/sass/application.scss',
    'stylesheets/responsive': './src/sass/responsive.scss',
    'stylesheets/context_menu': './src/sass/context_menu.scss',
    'stylesheets/jstoolbar': './src/sass/jstoolbar.scss',
    'javascripts/theme': './src/js/index.js'
  },
  output: {
    path: `${__dirname}/`,
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.scss/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              url: false,
              sourceMap: enabledSourceMap,
              importLoaders: 2,
            },
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: enabledSourceMap,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new RemoveEmptyScriptsPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
  target: ['web', 'es5'],
};