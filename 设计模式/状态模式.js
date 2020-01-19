/**
  - 美式咖啡态（american)：只吐黑咖啡
  - 普通拿铁态(latte)：黑咖啡加点奶
  - 香草拿铁态（vanillaLatte）：黑咖啡加点奶再加香草糖浆
  - 摩卡咖啡态(mocha)：黑咖啡加点奶再加点巧克力
 */

function changeState(state) {
  this.state = state;
  if( state === 'american'){
    console.log('我只吐黑咖啡')
  }else if(state === 'xxx'){
    /**
     *  剩下的都是 if else
     */
  }
}


class CoffeeMaker{
  constructor(state){
    this.state = 'init';
    this.leftMilk = '500ml'
  }

  stateToProcessor = {
    that:this,
    american(){
      console.log(this)
      console.log(this.that)
      console.log('咖啡机现在的牛奶存量是：',this.that.leftMilk)
      console.log('我只吐黑咖啡')
    },
    latte() {
      this.american();
      console.log('加点奶')
    },
    vanillaLatte() {
      this.latte();
      console.log('再加香草糖浆')
    },
    mocha() {
      this.latte()
      console.log('再加巧克力')
    }
  }

  changeState(state){
    this.state = state
    if(!this.stateToProcessor[state]){
      return;
    }
    this.stateToProcessor[state]
  }
}