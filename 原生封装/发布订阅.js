/**
 * EventBus的使用场景更像是一种广播
 * 当我们向EventBus发送一个事件，则该事件将会传递给多个该事件的订阅者
 * 
 */
function EventBus() {
  this.handle = {}
  this.on = (type, fn) => {
    this.handle[type] ? this.handle[type].push(fn) : this.handle[type] = [fn]
  }
  this.remove = (type, fn) => {
    this.handle[type] = this.handle[type].filter(e => e !== fn)
  }
  this.emit = (type) => {
    this.handle[type] && this.handle[type].forEach(e => e())
  }
}
let fn1 = (name='Li') => {
  console.log(1, name);
}
let fn2 = (age=18) => {
  console.log(1, age);
}
let bus = new EventBus()
bus.on('click', fn1)
bus.on('click', fn2)

bus.on('dbclick', () => {
  console.log(2);
})
bus.remove('click', fn1)
bus.emit('click')