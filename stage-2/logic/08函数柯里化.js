

function curry(func) {
    const handle = (...args) => {
        if (args.length >= func.length) {
            return func.apply(null, args)
        }
        return handle.bind(null, ...args)
    }
    return handle
}

// 测试
function sum(a, b, c) {
    return a + b + c
}
const currySum = curry(sum)
console.log(currySum(1, 2, 3))
console.log(currySum(1)(2,3))
console.log(currySum(1)(2)(3))
