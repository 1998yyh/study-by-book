/**
 * 代理模式 ：
 * 在某些情况下，出于种种考虑/限制，一个对象不能直接访问另一个对象，需要一个第三者（代理）牵线搭桥从而间接达到访问目的，这样的模式就是代理模式。
 */

//  礼物
const present = {
  type: '巧克力',
  value: 60
}

// 未知妹子
const girl = {
  // 姓名
  name: '小美',
  // 自我介绍
  aboutMe: '...', //（大家自行脑补吧）
  // 年龄
  age: 24,
  // 职业
  career: 'teacher',
  // 假头像
  fakeAvatar: 'xxxx', //(新垣结衣的图片地址）
  // 真实头像
  avatar: 'xxxx', //(自己的照片地址)
  // 手机号
  phone: 123456,
  // 礼物数组
  presents: [],
  // 记录最近一次的礼物
  lastPresent: present,
}

const baseInfo = ['age', 'career']
const privateInfo = ['avatar', 'phone']

const user = {
  // ...(一些必要的个人信息)
  isValidated: true,
  isVIP: false,
}

const JuejinLovers = new Proxy(girl, {
  get: function (girl, key) {
    if (baseInfo.indexOf(key) !== -1 && !user.isValidated) {
      alert('您还没有完成验证哦')
    }

    // .... 

    if (user..isValidated && privateInfo.indexOf(key) && !user.isVIP) {
      alert('只有VIP才可以查看信息哦')
      return
    }

  },
  set: function (girl, key, value) {
    if (key === 'lastPresent') {
      alert('sorry 您的礼物被拒收了')
      return
    }

    // 如果没有拒收， 则复制成功，同时并入presents数组
    girl[lastPresent] = value
    girl[presents] = [...presents, value]
  }
})