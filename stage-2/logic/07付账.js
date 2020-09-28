// 1 2 5纸币若干
// 如果支付6元，有多少种
function sum(list) {
    return list.reduce((s, v) => {
        s += v
        return s
    }, 0)
}
/**
 * 递归的形式查找
 */
function find(bills, target, bigger, list = [], result = []) {
    if (sum(list) === target) {
        result.push(list)
        list = []
    } else if (sum(list) < target) {
        bills.forEach(e => {
            if (e >= bigger) {
                const tmp = [...list]
                tmp.push(e)
                return find(bills, target, e, tmp, result)
            }
        })
    }
    return result
}

console.log(find([1, 2, 5], 6, 1));