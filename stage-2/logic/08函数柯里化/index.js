

function curry(func, thisArg = null) {
    const handle = (...args) => {
        if (args.length >= func.length) {
            return func.apply(thisArg, args)
        }
        return handle.bind(thisArg, ...args)
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

// function sum() {
//     const handle = (...args) => {
//         if (args.length === 3) {
//             return args.reduce((s, v) => s += v)
//         }
//         return handle.bind(null, ...args)
//     }
//     return handle(...arguments)
// }


// console.log(sum(1, 2, 3));
// console.log(sum(1, 2)(3));
// console.log(sum(1)(2)(3));
