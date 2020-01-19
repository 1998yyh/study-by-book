/**
有一天，产品经理韩梅梅找到李雷，给李雷提了这么个需求：
马上大促要来了，我们本次大促要做差异化询价。啥是差异化询价？就是说同一个商品，我通过在后台给它设置不同的价格类型，
可以让它展示不同的价格。具体的逻辑如下：

当价格类型为“预售价”时，满 100 - 20，不满 100 打 9 折
当价格类型为“大促价”时，满 100 - 30，不满 100 打 8 折
当价格类型为“返场价”时，满 200 - 50，不叠加
当价格类型为“尝鲜价”时，直接打 5 折
 */


// 询价方法，接受价格标签和原价为入参
function askPrice(tag, originPrice) {
  // 处理预热价
  if (tag === 'pre') {
    if (originPrice >= 100) {
      return originPrice - 20
    }
    return originPrice * 0.9
  }

  // 处理大促价
  if (tag === 'onSale') {
    if (originPrice >= 100) {
      return originPrice - 30
    }
    return originPrice * 0.8
  }

  // 处理返场价
  if (tag === 'back') {
    if (originPrice >= 200) {
      return originPrice - 50
    }
    return originPrice
  }

  // 处理尝鲜价
  if (tag === 'fresh') {
    return originPrice * 0.5
  }
}

/**
 * 违背了 “单一功能” 原则。一个function里面，处理了四坨逻辑
 * 不仅如此，它还违背了“开放封闭”原则。假如有一天韩梅梅再次找到李雷，要他加一个满 100 - 50 的“新人价”怎么办？他只能继续 if-else
 */

// 处理预热价
function prePrice(originPrice) {
  if (originPrice >= 100) {
    return originPrice - 20
  }
  return originPrice * 0.9
}

// 处理大促价
function onSalePrice(originPrice) {
  if (originPrice >= 100) {
    return originPrice - 30
  }
  return originPrice * 0.8
}

// 处理返场价
function backPrice(originPrice) {
  if (originPrice >= 200) {
    return originPrice - 50
  }
  return originPrice
}

// 处理尝鲜价
function freshPrice(originPrice) {
  return originPrice * 0.5
}

function askPrice(tag, originPrice) {
  // 处理预热价
  if (tag === 'pre') {
    return prePrice(originPrice)
  }
  // 处理大促价
  if (tag === 'onSale') {
    return onSalePrice(originPrice)
  }

  // 处理返场价
  if (tag === 'back') {
    return backPrice(originPrice)
  }

  // 处理尝鲜价
  if (tag === 'fresh') {
    return freshPrice(originPrice)
  }
}

/**
 * 这下确实是分离出来了 但是按照上面说的那个新人价的问题----这怎么办；
 * 
 * 还是又要if--else 
 * 
 * 我们使用了这么多if--else 目的到底是什么？ 
 * 
 * 是为了帮我们把if--else这个映射关系确定下来，
 * 那么在 JS 中，有没有什么既能够既帮我们明确映射关系，同时不破坏代码的灵活性的方法呢？
 * 
 * 对象映射
 */

// 定义一个询价处理器对象
const priceProcessor = {
  pre(originPrice) {
    if (originPrice >= 100) {
      return originPrice - 20;
    }
    return originPrice * 0.9;
  },
  onSale(originPrice) {
    if (originPrice >= 100) {
      return originPrice - 30;
    }
    return originPrice * 0.8;
  },
  back(originPrice) {
    if (originPrice >= 200) {
      return originPrice - 50;
    }
    return originPrice;
  },
  fresh(originPrice) {
    return originPrice * 0.5;
  },
};

function askPrice(tag, originPrice) {
  return priceProcessor[tag](originPrice)
}

// 如果增加新人价
priceProcessor.newUser = function (originPrice) {
  if(originPrice >= 100){
    return originPrice - 50;
  }
  return originPrice
}