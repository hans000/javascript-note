/**
 * 思路
 * 1. 创建空对象
 * 2. 设置原型链
 * 3. 让构造函数this指向改对象
 * 4. 判断结果返回对象
 * @param {*} func 构造函数
 */
function new$(func, ...args) {
    if (typeof func !== 'function') {
        throw new TypeError('参数期望是构造函数')
    }
    // const obj = {}
    // obj.__proto__ = func.prototype
    const obj = Object.create(func.prototype)
    const result = func.apply(obj, args)
    return result && typeof result === 'object' ? result : obj
}

// 测试
function Person(name) {
    this.name = name
}
Person.prototype.sayName = function() {
    console.log(`My name is ${this.name}`)
}
const me = new$(Person, 'Jack')
me.sayName()
console.log(me)