function InAndOut(dom,direction,time){
  const self = this;
  self.dom = dom;
  self.direction = direction;
  self.time = time;
  self.dom.addClass('my_animate');
  self.dom.css('transition',`${time/1000}s`)
  switch(self.direction){
    case 'left':
      self.directionClass = 'my_animate-left'
      break;
    case 'right':
      self.directionClass = 'my_animate-right'
      break;
    case 'bottom':
      self.directionClass = 'my_animate-bottom'
      break;
    case 'top':
      self.directionClass = 'my_animate-top'
      break;
  }
  self.goIn = function(){
    self.dom.removeClass(self.directionClass)
  }
  self.goOut = function(){
    self.dom.addClass(self.directionClass)
  }  
}

let a = new InAndOut($('.a'),'bottom',300);
let b = new InAndOut($('.b'),'top',600);
$('.btn1').on('click',function(){
  a.goIn();
  b.goIn();
})

$('.btn2').on('click',function(){
  a.goOut()
  b.goOut();
})