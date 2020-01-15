function classDecorator(target) {
  target.hasDecorator = true
  return target
}

@classDecorator
class Button {
  // 此处的 target 是被装饰的类本身
}

// console.log('Button 是否被装饰了：', Button.hasDecorator)
/**
 * 
 * @param {*} target 
 * @param {*} name 是我们修饰的目标属性的属性名
 * @param {*} descriptor 是属性描述对象
 * 
 * 类似 Object.defineProperty(obj , prop, descriptor)
 * 
 */
function funcDecorator(target, name, descriptor) {
  let originalMethod = descriptor.value;
  descriptor.value = function () {
    console.log('我是Func的装饰器逻辑')
    return originalMethod.apply(this, arguments)
  }
  return descriptor
}

class Button2 {
  @funcDecorator
  // 这时的target变成了 Button.prototype，即类的原型对象，这时因为 onclick 是依附于实例存在的
  onClick() {
    console.log('我是Func的原有逻辑')
  }
}

const button2 = new Button2();
button2.onClick();

function readOnly(target, name, descriptor) {
  descriptor.writable = false;
}