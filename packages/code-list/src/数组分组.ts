function group<T>(array: T[], count: number) {
    const result: T[][] = []
    for (let i = 0; i < array.length; i+=count) {
        result.push(array.slice(i, i + count))
    }
    return result
}


const list = [1, 2, 3, 4, 5, 6, 7, 8, 9]

console.log(group(list, 3))
console.log(group(list, 5))

// [ [ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ] ]
// [ [ 1, 2, 3, 4, 5 ], [ 6, 7, 8, 9 ] ]