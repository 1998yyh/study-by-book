class Stroage {
  static getInstance(){
    let ins = null;
    if(!Stroage.ins){
      Stroage.ins = new Stroage();
    }
    return Stroage.ins;
  }
  getItem(key){
    return localStorage.getItem(key)
  }
  setItem(key,value){
    return localStorage.setItem(key,value)
  }
}

function StroageBase(params) {
  
}
StroageBase.getInstance = (function() {
  let ins = null
  return function() {
    if(!ins){
      ins = new StroageBase();
    }
    return ins
  }
})()
StroageBase.prototype.setItem = function(key,value) {
  return localStorage.setItem(key,value)
}
StroageBase.prototype.getItem = function(key) {
  return localStorage.getItem(key)
}