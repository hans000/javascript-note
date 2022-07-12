
function isNull(val: any) {
    return val === undefined || val === null
}

/**
 * 不严谨，比如页面嵌套iframe就是不同的context环境，用Object.getPrototypeOf(obj) === Object.prototype返回的是false
 * 
 */
function isPlainObject(obj: any) {
    if (typeof obj !== 'object' || obj === null) {
        return false
    }

    return Object.getPrototypeOf(obj) === Object.prototype;
}

// 为什么redux不使用Object.prototype.toString判断Plain Object?
// Object.prototype.toString判断对象的类型是不严谨的，Symbol.toStringTag可以修改toString的输出

function test() {
    const a = {}
    console.log(Object.prototype.toString.call(a))
    // @ts-ignore
    a[Symbol.toStringTag] = 'Foo'
    console.log(Object.prototype.toString.call(a))
}

// [object Object]
// [object Foo]



// redux v4.0.0的 isPlainObject
// function isPlainObject(obj: any) {
//     if (typeof obj !== 'object' || obj === null) return false
//     let proto = obj
//     while (Object.getPrototypeOf(proto) !== null) {
//       proto = Object.getPrototypeOf(proto)
//     }
//     return Object.getPrototypeOf(obj) === proto
// }