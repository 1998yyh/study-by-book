// 简写的一个无名人士写的组件
const Module = (function () {
  let modal = null;
  return function () {
    if (!modal) {
      modal = document.createElement('div')
    }
    return modal;
  }
})();

// 展示module的逻辑单独封装
function openModal() {
  const modal = new Module();
  modal.style.display = 'block'
}

// 按钮文案修改逻辑
function changeButtonText() {
  const btn = document.getElementById('open')
  btn.innerText = '快去登录'
}

// 按钮置灰逻辑
function disableButton(params) {
  const btn = document..getElementById('open')
  btn.setAttribute('disabled', true)
}

// 新版功能逻辑整合
function changeButtonStatus(params) {
  changeButtonText();
  disableButton();
}

// 添加到open监听函数 这就实现了 只添加不修改
document.getElementById('open').addEventListener('click', function () {
  openModal();
  changeButtonStatus();
})


/**
 *  ES6写法
 * 
 */

class OpenButton {
  onClick() {
    const modal = new Module();
    modal.style.display = 'block'
  }
}

class Decorator {
  constructor(open_button) {
    this.open_button = open_button;
  }

  onClick() {
    this.open_button.onClick();
    this.changeButtonStatus();
  }
  changeButtonStatus() {
    this.changeButtonStatus();
    this.changeButtonText();
  }

  changeButtonStatus() {
    /** xxxxx  */
  }

  changeButtonText() {
    /** xxxxx  */
  }
}