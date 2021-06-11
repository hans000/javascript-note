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

function fib(num, a = 0, b = 1) {
    if (num <= 0) {
        return a
    }
    debugger
    return fib(num - 1, b, a + b)
}

console.log(fib(900));

// function fib(num) {
//     let a = 0
//     let b = 1
//     while (num > 0) {
//         const a1 = a
//         a = b
//         b = a1 + b
//         num--
//     }
//     return a
// }

// console.log(fib(900));

// function tailFactorial(n, total) {
//     if (n === 1) return total;
//     return tailFactorial(n - 1, n * total);
// }
   
// function factorial(n) {
//     return tailFactorial(n, 1);
// }
   
// factorial(100000) // 120