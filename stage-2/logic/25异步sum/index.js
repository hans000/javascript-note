// 给定一个asyncAdd函数，实现asyncSum
function asyncAdd(a, b, callback) {
    setTimeout(() => callback(null, a + b), 1000);
}

async function asyncSum(...args) {
    if (args.length === 1) {
        return args[0]
    }
    const [a, b, ...restArgs] = args
    const result = await new Promise((resolve, reject) => {
        asyncAdd(a, b, (err, result) => {
            err ? reject(err) : resolve(result)
        })
    })
    return asyncSum(result, ...restArgs)
}

asyncSum(1, 2, 3).then(console.log)