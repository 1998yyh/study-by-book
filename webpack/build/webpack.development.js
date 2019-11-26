const {
  smart
} = require('webpack-merge')
const webpack = require('webpack')
const base = require('./webpack.base')

module.exports = smart(base,{
  module:{

  },
  devServer:{
    hot:true
  },
  plugins:[
    new webpack.NamedModulesPlugin(),//用于启动HMR时可以显示模块的相对路径
    new webpack.HotModuleReplacementPlugin(), // Hot Module Replacement 的插件
  ]
})
