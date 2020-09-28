
function add(a, b) {
    const len = Math.max(a.length, b.length)
    const stack = []
    let carry = 0
    for (let i = 0; i < len; i++) {
        const ta = +a[a.length - i - 1] || 0
        const tb = +b[b.length - i - 1] || 0
        const sum = ta + tb + carry
        carry = sum > 9 ? 1 : 0
        const n = sum % 10
        stack.push(n)
    }
    if (carry) {
        stack.push(1)
    }
    return stack.reverse().join('')
}

console.log(add('111256212111125621212138111256212121382138', '111256111256212121382121112562121213812138'));