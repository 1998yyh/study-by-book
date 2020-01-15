/**
 * 适配器模式通过把一个类的接口变换成客户端所期待的另一种接口，
 * 可以帮我们解决不兼容的问题。
 * 
 * 比如 耳机的转接器 等等
 * 
 */

//  基于Fetch的http库
export default class HttpUtils {
  static get(url) {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(response => response.json())
        .then(result => {
          resolve(result)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  static post(url, data) {
    return new Promise((resolve, reject) => {
      fetch(url, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: this.changeData(data)
        })
        .then(response => response.json())
        .then(result => {
          resolve(result)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  static changeData(obj) {
    let prop, str = '',
      i = 0;
    for (prop in obj) {
      if (!prop) return
      if (i == 0) {
        str += prop + '=' + obj[prop]
      } else {
        str += '&' + prop + '=' + obj[prop]
      }
      i++
    }
    return str
  }
}

const URL = "xxxxx"
const params = {
  // ...
}

// post 请求
const postResponse = await HttpUtils.post(URL, params) || {};

// get请求
const getResponse = await HttpUtils.get(URL)


// 基于Ajax的请求
function Ajax(type, url, data, success, failed) {
  // 创建ajax对象
  var xhr = null;
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else {
    xhr = new ActiveXObject('Microsoft.XMLHTTP')
  }

  //  ...(此处省略一系列的业务逻辑细节)

  var type = type.toUpperCase();

  // 识别请求类型
  if (type == 'GET') {
    if (data) {
      xhr.open('GET', url + '?' + data, true); //如果有数据就拼接
    }
    // 发送get请求
    xhr.send();

  } else if (type == 'POST') {
    xhr.open('POST', url, true);
    // 如果需要像 html 表单那样 POST 数据，使用 setRequestHeader() 来添加 http 头。
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    // 发送post请求
    xhr.send(data);
  }

  // 处理返回数据
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        success(xhr.responseText);
      } else {
        if (failed) {
          failed(xhr.status);
        }
      }
    }
  }
}

/**
 * 他是这样调用的 :
 * 
 *  Ajax('get', url, post , fundction(data){
 * 
 * },function(error){
 * 
 * })
 * 
 * 与之前的接口名不同，入参的方式也不同，所以要使用适配器模式
 * 
 */

async function AjaxAdapter(type, url, data, success, failed) {
  const type = type.toUpperCase();
  let result;
  try {
    if (type === "GET") {
      result = await HttpUtils.get(url)
    } else if (type === "POST") {
      result = await HttpUtils.post(url, data) || {}
    }
    result.status === ! && success ? success(result) : failed(result.statusCode)
  } catch (error) {
    if (failed) {
      failed(error.statusCode)
    }
  }
}

async function Ajax(type, url, data, success, failed) {
  await AjaxAdapter(type, url, data,success,failed)
}

