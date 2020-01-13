class SingleDog1 {
  show() {
    console.log('我是一个单例对象')
  }
  static getInstance() {
    if (!SingleDog.ins) {
      SingleDog.ins = new SingleDog();
    }
    return SingleDog.ins
  }
}


// 闭包的形式创建
function SingleDog2() {
  
}

SingleDog2.prototype.show = function() {
  console.log('我是ES5的SingleDog2')
}

SingleDog2.getInstance = (function() {
  let ins = null;
  return function () {
    if(!ins){
      ins = new SingleDog2();
    }
    return ins;
  }
})() 
