const path = require('path')
const webpack = require('webpack')

const config = {
  /**
   * development默认会给你最好的开发经验重点是：
   * 浏览器调试工具
   * 快速增量编译可加快开发周期
   * 运行是有用的错误信息
   * 
   * production 
   * 输出尺寸小
   * 运行是快速编写代码
   * 省略仅开发代码
   * 不公开源代码或文件路径
   * 易于使用的输出资产
   */
  mode: 'development',
  // 默认是 eval in development模式 否则，不使用devtool
  devtool: 'eval', // SourceMap
  // 默认是memory  该选项非常简单，它告诉webpack将缓存存储在内存中，并且不允许进行其他配置，
  // filesystem 打开更多配置选项
  cache: {
    type: 'filesystem',
    cacheDirectory: path.resolve(__dirname, '.temp_cache'),
    hashAlgorithm: 'md4',
    // 默认是 ${config.name}-${config.mode}; 如果具有多个应该具有独立焕春的配置时，使用是有意的；
    // name:'xx',

    /**string:'background' | 'idle' | 'instant' | 'pack'
     * 'background'：在编译时将数据存储在后台，但不会阻止编译
     * 'idle'：当编译器空闲时，将数据存储在每个缓存项的一个文件中
     * 'instant'：即时存储数据。阻止编译，直到存储数据
     * 'pack'：当编译器空闲时，将所有缓存项的数据存储在单个文件中
     */
    // store:'background'

    optimization:{
    },
    plugins:[
      new webpack.DllPlugin({
        name:'vendor_[hash]',
        path:path.resolve(__dirname,"dist/manifest.json"),
      }),
      new webpack.DllReferencePlugin({
        manifest:path.resolve(__dirname,'dist/manifest.json')
        
      })
    ]
  }
}

module.exports = config;