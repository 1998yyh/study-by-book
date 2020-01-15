/**
 *  假装自己看懂了
 */

/**
 *  axios 实际上派发的请求是 dispatchRequest 方法。 该方法内部其实做了两件事
 * 
 *  1、数据转换，转换请求体 / 响应体， 可以理解为数据层面的适配
 *  
 *  2、调用适配器
 */

//  config 用户的配置  如果用户未手动配置，则使用默认的适配器
function adapter(params) {
  const adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    // 请求成功的回调
    throwIfCancellationRequested(config)

    // 转换响应体
    response.data = transfromData(
      response.data,
      response.headers,
      config.transformResponse
    )

    return response;
  },function onAdapterRejection(reason) {
    // 请求失败的回调
    throwIfCancellationRequesed(config)
    
    // 转换响应体
    response.data = transfromData(
      response.data,
      response.headers,
      config.transformResponse
    )
  })
}

function getDefaultAdapter(params) {
  let adapter;
  // 判断当前是否是node环境
  if(typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]'){
    // 如果是node环境，调用node专属的http适配器
    adapter = require('./adapters/http')
  }else if(typeof XMLHttpRequest !== 'undefined'){
    // 如果是浏览器环境，调用基于xhr的适配器
    adapter = require('./adapters/xhr')
  }
  return adapter
}
