const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  // entry: '',               // 入口文件
  // output: {},              // 出口文件
  // module: {},              // 处理对应模块
  // plugins: [],             // 对应的插件
  // devServer: {},           // 开发服务器配置
  // mode: 'development'      // 模式配置

  // 单入口
  // entry:'./src/index.js',

  // 多入口
  entry:{
    index:'./src/index.js',
    login:'./src/login.js',
  },
  output:{
    filename:'boundle.js',
    path:path.resolve('dist')
  },
  mode:'development',
  plugin:[
    // 通过new一下这个类来使用插件
    new htmlWebpackPlugin({
      // 会在创建好的src目录下创建一个html
      template:'./src/index.js',
      hash:true //会在打包好的后面加上hash
    })
  ]
}