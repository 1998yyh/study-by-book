const webpack = require('webpack')
const HtmlWebpackPlugins = require('html-webpack-plugin')

const config = {
  // ... webpack 配置
  module: {
    rules: [{
      test: /.*\.(gif|png|jpe?g|svg|webp)$/i,
      use: [{
          loader: 'file-loader',
          options: {}
        },
        {
          loader: 'url-loader',
          options: {
            limit: 8192,
          }
        },
        {
          loader: 'image-webpack-loader',
          options: {
            mozjpeg: {
              progressive: true,
              quality: 65
            },
            optipng: {
              enabled: false
            },
            pngquant: {
              quality: '65-90',
              speed: 4
            },
            gifsicle: {
              interlaced: false
            },
            webp: {
              quality: 75
            }
          }
        }
      ]
    },{
      test:/\.js$/,
      use:'babel-loader'
    },{
      test:/\.css/,
      use:['style-loader','css-loader']
    }],
  },
  plugins: [
    new HtmlWebpackPlugins({
      filename: 'index.html',
      // template:'',
      minify: {
        minifyCSS: true,
        minifyJS: true
      }
    })
  ],
  optimization:{
    splitChunks:{
      chunks:'all', // 所有的chunks 代码公共的部分分离出来成为一个单独的文件
    }
  }
}

module.exports = config;