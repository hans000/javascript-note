/**
 * 编写一个求和函数sum，使输入sum(2)(3)或输入sum(2,3)，输出结果都为5
 */


function sum(...args) {
    if (args.length > 2) {
        throw new Error('参数不超2个')
    }
    if (args.length === 2) {
        return args.reduce((s, v) => s += v, 0)
    }
    return (b) => {
        return args[0] + b
    }
}

console.log(sum(2, 3));
console.log(sum(2, 3));
console.log(sum(2)(3));