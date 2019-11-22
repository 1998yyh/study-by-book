const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

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
      //  指定特定路径去打包
      // include:[
      //   path.resolve(__dirname,'node_modules')
      // ],
      // 指定不打包某路径
      // exclude:[
      //   path.resolve(__dirname, 'node_modules')
      // ],
      // and 必须匹配数组中所有条件
      // or 匹配数组中任意一个条件
      //  not 排除数组中所有条件
      // not:[
      //   (value) => {
      //     /** xxx  */
      //     return true;
      //   }
      // ]
      // use: [
      //   'style-loader',
      //   'css-loader',
      // ],
      // use: ExtractTextPlugin.extract({
      //   // 最后用的那个 use 的第一个
      //   fallback: 'style-loader',
      //   /**
      //    * 或者是数组形式
      //    * 比如转化scss use:['css-loader' ,'scss-loader']
      //    */
      //   use: 'css-loader'
      // })
      use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {}
        },
        'css-loader'
      ],
    }, {
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader']
    }, {
      test: /\.(png|jpe?g|gif)$/,
      use: ['file-loader']
    }, {
      enforce: 'pre',
      test: /\.js$/,
      include: [
        path.resolve(__dirname, 'src')
      ],
            /**
       *  type: javascript/auto     webpack 3 默认的类型，支持现有的各种JS代码模块类型
       *        javascript/esm      ECMAScript modules 其他模块类型不支持 .mjs文件的默认类型
       *        javascript/dynamic    CommonJS和AMD，排除ESm
       *        javascript/json       JSON格式数据，require或者import都可以引入
       *        webassembly/experimental  试验阶段，.wasm默认类型
       */
      type: 'javascript/auto',
      use: 'babel-loader'
    },{

    }],
  },
  output: {
    filename: 'more.js',
    path: path.resolve(__dirname, 'dist/[hash:8]'),
    publicPath: path.resolve(__dirname, 'dist/[hash:8]')
  },
  /**
   * plugins里也可以先new 对象然后再放到plugins里 例如
   *  const HtmlWebpackPluginObj = new HtmlWebpackPlugin({filename:'a.html',template:'littlePage/src/template/tamplate.html'})
   *  plugins:[ HtmlWebpackPluginObj ]
   * 
   *  说的尼玛废话 草
   * 
   *  多个实例对应多个
   *  const ExtractTextPluginCss = xxxxxxx
   *  const ExtractTextPluginScss = xxxxxxx
   *  相对的上面Rules做修改
   *  ExtractTextPluginCss.extract(xxx)
   *  ExtractTextPluginScss.extract(xxx)
   */
  plugins: [
    /**
     * 定义的一些全局变量 需要注意的以下几点
     * 如果配置的是字符串，那么整个字符串会被当成代码片段来执行，其结果作为最终变量的值
     * 如果配置的值不是字符串，也不是一个对象字面量，那么该值会被转为一个字符串，如true，最后的结果是'true'
     * 如果配置的是一个对象字面量，那么该对象的所有key会议相同的方式去定义
     * 
     */
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(true), // const PRODUCTION = true
      VERSION: JSON.stringify('5fa3b9'), // const VERSION = '5fa3b9'
      BROWSER_SUPPORTS_HTML5: true, // const BROWSER_SUPPORTS_HTML5 = 'true'
      TWO: '1+1', // const TWO = 1 + 1,
      CONSTANTS: {
        APP_VERSION: JSON.stringify('1.1.2') // const CONSTANTS = { APP_VERSION: '1.1.2' }
      }
    }),

    /**
     * 
     */
    new CopyWebpackPlugin([
      {
        from:'littlePage/src/images', to: 'build/images'
      }
    ]),
    new HtmlWebpackPlugin({
      // 输出文件名字
      filename: 'a.html',
      // 使用的模板
      template: 'littlePage/src/template/template.html'
    }),
    new ExtractTextPlugin('style.css'),
    new MiniCssExtractPlugin({
      filename: '[name].[hash:8].css',
      chunkFilename: '[id.css]'
    })
  ],
  resolve: {
    // noParse:/jquery|lodash/,
    // noParse(content){
    //   return /jquery|lodash/.test(content)
    // },
    modules: [
      path.resolve(__dirname, 'node_modules'), 'node_modules'
    ],
    alias: {
      '~': path.resolve(__dirname)
    },
    extensions: ['.js', '.vue', '.json']
  }
}