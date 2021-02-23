
function throttle(func, internal = 300, flag = false) {
    let timestamp = Date.now()

    return (...args) => {
        if (flag) {
            func(...args)
            flag = false
        }
        if (Date.now() - timestamp > internal) {
            func(...args)
            timestamp = Date.now()
        }
    }
}

const handle = throttle(console.log, 1000, true)

setInterval(() => {
    handle(111)
}, 100)