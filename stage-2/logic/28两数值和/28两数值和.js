
function sum(list, target) {
    const map = new Map()
    for (let i = 0; i < list.length; i++) {
        map.set(target - list[i], i)
    }
    for (let i = 0; i < list.length; i++) {
        const r = map.get(list[i])
        if (r !== undefined && r !== i) {
            return [r, i]
        }
    }
    return null
}
// 2, 7, 3, 8
// 7->0  2->1  6->2  1->3
console.log(sum([4.5, 2, 7, 3, 8], 9));