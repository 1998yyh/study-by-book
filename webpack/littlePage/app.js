const webpack = require('webpack')
const middleware = require('webpack-dev-middleware')
const webpackOptions = require('../webpack.config.js')

webpackOptions.mode = 'development'

const compiler = webpack(webpackOptions)
const express = require('express')
const app = express()

app.use(middleware(compiler,{
  // webpack-dev-middleware 的配置选项
}))

app.listen(3000,()=>{
  console.log('服务器启动')
})

