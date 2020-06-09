/**
 * 老早前看网上的代码
 */
function getType(val) {
    const cfg = {
      '[object Object]': 'object',
      '[object Array]': 'array',
      '[object Number]': 'object number',
      '[object Boolean]': 'object boolean',
      '[object String]': 'object string',
      '[object Null]': 'null',
    }
    const type = typeof val
    const toString = e => Object.prototype.toString.call(e)
    return type === 'object' ? cfg[toString(val)] : type
}

/**
 * 其实我觉得行代码就可以了
 */
function getType(val) {
    return Object.prototype.toString.call(val).toLowerCase().slice(8, -1)
}

/**
 * 当然也可以写成函数表达式
 * 其实这里有个技巧，就是slice支持负数，这一点是优于substring的
 */
const getType = val => Object.prototype.toString.call(val).toLowerCase().slice(8, -1)


/**
 * 然而这并不是一劳永逸的，对于自定义的对象还是要通过instanceof判断的
 * 这也很容易理解，毕竟多数时候其实用不了折磨多，最最常用的还是判断数组
 * 但是我们现在是幸福的，可以用Array.isArray判断了
 */
function test() {
    const list = [1, 3, 5]
    console.log(Array.isArray(list));
}