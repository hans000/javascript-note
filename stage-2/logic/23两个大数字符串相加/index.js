
function add(...args) {
    if (!args.length) {
        throw new Error('至少1个参数')
    }
    const len = args.sort((a, b) => b.length - a.length)[0].length
    const stack = []
    let carry = 0
    for (let i = 0; i < len; i++) {
        const tNum = args.map(num => +num[num.length - i - 1] || 0)
        const sum = tNum.reduce((s, v) => s + v) + carry
        carry = sum / 10 | 0
        const n = sum % 10
        stack.push(n)
    }
    if (carry) {
        stack.push(1)
    }
    return stack.reverse().join('')
}

console.log(add('111'));
console.log(add('111', '222'));
console.log(add('111', '222', '3313'));
console.log(add('111256212111125621212138111256212121382138', '111256111256212121382121112562121213812138'));