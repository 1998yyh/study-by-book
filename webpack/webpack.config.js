const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  // 单个文件入口
  // entry:'./littlePage/src/js/index.js',
  // output:{
  //   filename:'index.main.js',
  //   path:path.resolve('dist')
  // }

  // 多个入口文件
  // entry:{
  //   main:'./littlePage/src/js/main.js',
  //   index:'./littlePage/src/js/index.js',
  // },
  // output:{
  //   filename:'[name].js',
  //   path:path.resolve(__dirname , 'dist')
  // }

  // 多个文件打包
  entry: {
    more: [
      './littlePage/src/js/main.js',
      './littlePage/src/js/index.js'
    ]
  },
  module: {
    rules: [{
      test: /\.css/,
      use: [
        'style-loader',
        'css-loader',
      ],
    }, ],
  },
  output: {
    filename: 'more.js',
    path: path.resolve(__dirname, 'dist/[hash]')
  },
  plugins: [
    new HtmlWebpackPlugin({
      // 输出文件名字
      filename: 'a.html',
      // 使用的模板
      template: 'littlePage/src/template/template.html'
    })
  ]
}