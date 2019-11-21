


## 
+ css-loader 解析css代码，处理css中依赖
+ style-loader 将cs-loader解析的结果转变成js 动态插入style标签

分离css
使用 extract-text-webpack-plugin插件
这个插件并未发布支持 webpack 4.x 的正式版本，所以安装的时候需要指定使用它的 alpha 版本：npm install extract-text-webpack-plugin@next -D