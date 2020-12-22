
function findMaxSubtringLength(str) {
    const map = {}
    let len = 0
    for (l = 0, r = 0; r < str.length; r++) {
        const index = map[str[r]]
        if (index) {
            l = Math.max(l, index)
        }
        len = Math.max(len, r - l + 1)
        map[str[r]] = r + 1
    }
    return len
}

console.log(findMaxSubtringLength("abba"));