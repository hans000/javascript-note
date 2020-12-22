

function strStr(haystack, needle) {
    if (needle.length === 0) {
        return 0
    }
    if (needle.length > haystack.length) {
        return -1
    }
    for (let i = 0; i < haystack.length; i++) {
        if (haystack[i] === needle[0]) {
            let flag = false
            for (let j = 1; j < needle.length; j++) {
                if (haystack[i + j] !== needle[j]) {
                    flag = true
                    break
                }
            }
            if (flag) {
                continue
            }
            return  i
        }
    }
    return -1
}

console.log(strStr('acb', ''));
console.log(strStr('acb', 'acbwd'));
console.log(strStr('acb', 'cb'));
console.log(strStr('abccccd', 'cccd'));