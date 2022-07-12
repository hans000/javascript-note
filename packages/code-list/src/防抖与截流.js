
function debounce(func, delay = 500, thisArg = null) {
    let timer
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            func.call(thisArg, ...args)
        }, delay)
    }
}

function throttle(func, interval = 1000, thisArg = null) {
    let stamp
    return (...args) => {
        if (stamp == null || Date.now() - stamp > interval) {
            func.call(thisArg, ...args)
            stamp = Date.now()
        }
    }
}