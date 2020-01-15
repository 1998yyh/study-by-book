/**
 *  利用冒泡进行事件代理
 */

// 获取父元素
const father = document.getElementById('father')

// 给父元素安装一次监听函数
father.addEventListener('click', function (e) {
  // 识别是否是目标子元素
  if (e.target.tagName === 'A') {
    // 以下是监听函数的函数体
    e.preventDefault()
    alert(`我是${e.target.innerText}`)
  }
})


/**
 * 虚拟代理:
 * 
 *  除了图片懒加载，还有一种操作叫图片预加载。预加载主要是为了避免网络不好、或者图片太大时，页面长时间给用户留白的尴尬。
 *  常见的操作是先让这个 img 标签展示一个占位图，然后创建一个 Image 实例，让这个 Image 实例的 src 指向真实的目标图片地址、
 *  观察该 Image 实例的加载情况 —— 当其对应的真实图片加载完毕后，即已经有了该图片的缓存内容，再将 DOM 上的 img 元素的 src 指向真实
 *  的目标图片地址。此时我们直接去取了目标图片的缓存，所以展示速度会非常快，从占位图到目标图片的时间差会非常小、小到用户注意不到，
 *  这样体验就会非常好了。
 * 
 */
class PreLoadImage {
  // 占位图的url地址
  static LOADING_URL = 'xxxxx'

  constructor(imgNode) {
    // 获取该实例对应的DOM节点
    this.imgNode = imgNode
  }

  // 该方法用于设置真实的图片地址
  setSrc(targetUrl) {
    // img节点初始化时展示的是一个占位图
    this.imgNode.src = PreLoadImage.LOADING_URL

    const image = new Image();
    image.onload = () => {
      this.imgNode.src = targetUrl
    }
  }
}

/**
 *  这个 PreLoadImage 乍一看没问题，但其实违反了我们设计原则中的单一职责原则。PreLoadImage 不仅要负责图片的加载，
 *  还要负责 DOM 层面的操作（img 节点的初始化和后续的改变）。这样一来，就出现了两个可能导致这个类发生变化的原因。
 */

class PreLoadImage {
  constructor(imgNode) {
    this.imgNode = imgNode
  }

  setSrc(imgUrl){
    this.imgNode.src = imgUrl
  }
}

class ProxyImage {
  static LOADING_URL = 'xxxxxxx'
  constructor(targetImage){
    this.targetImage = targetImage
  }

  setSrc(targetUrl) {
    this.targetImage.setSrc(ProxyImage.LOADING_URL)

    const virtualImage = new Image();

    virtualImage.onload = () => {
      this.targetImage.setSrc(targetUrl)
    }
    virtualImage.src = targetUrl
  }
  
  
}