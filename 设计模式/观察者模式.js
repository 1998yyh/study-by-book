/**
 * 观察者模式定义了一种一对多的依赖关系， 让多个观察者对象同时监听某一个目标对象
 * 
 * 当这个目标对象的状态发生变化时，会通知所有的观察者对象，使他们能够自动更新。
 */

class Publisher {
  constructor() {
    this.observers = [];
    console.log('Publisher created')
  }

  add(observer) {
    console.log('Publisher.add invoked')
    this.observers.push(observer)
  }

  remove(observer) {
    console.log('Publisher.remove invoked')
    this.observers.forEach((item, i) => {
      if (item === observer) {
        this.observers.splice(i, 1)
      }
    })
  }

  // 通知所有订阅者

  notify(){
    console.log('Publisher.notify invoked')
    this.observers.forEach(observer => {
      observer.update(this)
    })
  }
}

class observer{
  constructor(){
    console.log('Observer create')
  }

  update(){
    console.log('observer.update invoked')
  }
}

class PrdPublisher extends Publisher{
  constructor(){
    super();

    this.preState = null;
    this.observers = [];
    console.log('PrePublisher created')
  }

  getState() {
    console.log('PrdPublisher.getState invoked')
    return this.prdState
  }
  
  setState(state){
    console.log('PrdPublisher.setState invoked')
    this.prdState = state;
    this.notify()
  }
}

class DeveloperObserver extends observer {
  constructor() {
    super();

    this.prdState = {}
    console.log('DeveloperObserver created')
  }

  update(publisher){
    console.log('DevloperObserver.update invoked')
    this.prdState = publisher.getState()
    this.work()
  }

  work(){

  }
}