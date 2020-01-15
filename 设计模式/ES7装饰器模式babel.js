'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _desc, _value, _class2;

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function classDecorator(target) {
  target.hasDecorator = true;
  return target;
}

var Button = classDecorator(_class = function Button() {
  _classCallCheck(this, Button);
}) || _class;

// console.log('Button 是否被装饰了：', Button.hasDecorator)

function funcDecorator(target, name, descriptor) {
  var originalMethod = descriptor.value;
  descriptor.value = function () {
    console.log('我是Func的装饰器逻辑');
    return originalMethod.apply(this, arguments);
  };
  return descriptor;
}

var Button2 = (_class2 = function () {
  function Button2() {
    _classCallCheck(this, Button2);
  }

  _createClass(Button2, [{
    key: 'onClick',
    value: function onClick() {
      console.log('我是Func的原有逻辑');
    }
  }]);

  return Button2;
}(), (_applyDecoratedDescriptor(_class2.prototype, 'onClick', [funcDecorator], Object.getOwnPropertyDescriptor(_class2.prototype, 'onClick'), _class2.prototype)), _class2);


var button2 = new Button2();
button2.onClick();
