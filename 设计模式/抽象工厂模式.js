class MobilePhoneFactory {
  createOS(){
    throw new Error('抽象工厂方法不允许直接调用，需要重写')
  }

  createHardWare(){
    throw new Error('抽象工厂方法不允许直接调用，需要重写')
  }
}

class xiaoMi extends MobilePhoneFactory {
  createOS(){
    console.log('android')
  }

  createHardWare(){
    console.log('xiao mi')
  }
}


/**
 * 尝试去分离一个系统中变与不变的部分
 * 
 */