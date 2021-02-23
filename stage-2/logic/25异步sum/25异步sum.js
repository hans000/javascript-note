// 给定一个asyncAdd函数，实现asyncSum
function asyncAdd(a, b, callback) {
    setTimeout(function () {
        callback(null, a + b);
    }, 1000);
}

async function asyncSum(...args) {
    if (args.length === 1) {
        return args[0]
    }
    const result = await new Promise(resolve => {
        asyncAdd(args[0], args[1], (err, result) =>{
            resolve(result)
        })
    })
    return asyncSum(result, ...args.splice(2))
}

asyncSum(1, 2, 3).then(console.log)