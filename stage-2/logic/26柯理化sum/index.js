
function sum(...args) {
    const list = [...args]
    const handle = (...args2) => {
        list.push(...args2)
        return handle
    }
    handle.valueOf = () => list.reduce((s, a) => s + a)
    return handle
}

console.log(sum(1, 2, 3).valueOf());
console.log(sum(1, 2)(3).valueOf());
console.log(sum(1)(2)(3).valueOf());