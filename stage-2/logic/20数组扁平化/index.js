
function flat(arr, deep = -1) {
    const result = []
    if (deep === 0) {
        return arr
    }
    arr.forEach(item => {
        if (Array.isArray(item)) {
            result.push(...flat(item, deep - 1))
        } else {
            result.push(item)
        }
    })
    return result
}

console.log(flat([1, 2, 3]));
console.log(flat([1, 2, [3, 4]]));
console.log(flat([1, [2, [3, 4]]]));
console.log(flat([1, [2, [3, 4]]], 0));
console.log(flat([1, [2, [3, 4]]], 1));
console.log(flat([1, [2, [3, 4]]], 2));