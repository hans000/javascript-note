
function debounce(func, delay = 1000, flag = false) {
    let timer = null;
    return (...args) => {
        if (flag) {
            func(...args)
            flag = false
        }
        clearTimeout(timer)
        timer = setTimeout(() => {
            func(...args)
        }, delay)
    }
}

const handle = debounce(console.log, 1000, true)

handle(1)
handle(1)
handle(1)
