// 1 1 2 3 5

// function fib(num) {
//     if (num <= 2) return 1
//     return fib(num - 1) + fib(num - 2)
// }

// console.log((fib(35)));

// function fib(num, cache = []) {
//     if (num <= 2) {
//         return 1
//     }
//     if (cache[num]) {
//         return cache[num]
//     }
//     const result = fib(num - 1, cache) + fib(num - 2, cache)
//     cache[num] = result
//     return result
// }

// console.log(fib(35));
// console.log(fib(9000));

// function fib(num, a = 0, b = 1) {
//     if (num <= 0) {
//         return a
//     }
//     return fib(num - 1, b, a + b)
// }

// console.log(fib(900));

function fib(num) {
    let a = 0,
        b = 1,
        s = 0;
    while (num > 0) {
        a = b
        s = a + b
        num--
    }
    return s
}
console.log(fib(1));
console.log(fib(2));
console.log(fib(3));
