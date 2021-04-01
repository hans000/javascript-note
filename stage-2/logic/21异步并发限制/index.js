
// function fetchLimit(promiseList, limit = 3) {
//     const data = []
//     const runningList = promiseList.slice(0, limit)
//     const pendingList = promiseList.slice(limit)

//     const handle = (task, resolve) => {
        
//     }

//     return new Promise((resove) => {
//         pendingList.forEach(p => {
//             p.then(msg => {
//                 data.push(msg)
//             })
//         })
//         resove(data)
//     })
// }

// const createTask = (msg, delay) => {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             console.log(msg);
//             resolve(msg)
//         }, delay)
//     })
// }

// fetchLimit([
//     createTask('1', 1000),
//     createTask('2', 1000),
//     createTask('3', 1000),
//     createTask('4', 1000),
//     createTask('5', 1000),
//     createTask('6', 1000),
// ]).then(data => {
//     console.log(data);
// })

// function limit(count, array, iterateFunc) {
//     const tasks = []
//     const doingTasks = []
//     let i = 0
//     const enqueue = () => {
//         // 递归出口
//         if (i === array.length) {
//             return Promise.resolve()
//         }
//         const task = Promise.resolve().then(() => iterateFunc(array[i++]))
//         tasks.push(task)
//         const doing = task.then(() => doingTasks.splice(doingTasks.indexOf(doing), 1))
//         doingTasks.push(doing)
//         const res = doingTasks.length >= count ? Promise.race(doingTasks) : Promise.resolve()
//         return res.then(enqueue)
//     };
//     return enqueue().then(() => Promise.all(tasks))
// }

// // test
// const timeout = i => new Promise(resolve => setTimeout(() => resolve(i), i))

// limit(2, [1000, 1000, 1000, 1000], timeout).then((res) => {
//     console.log(res)
// })

const createTask = (msg, delay) => {
    return () => new Promise((resolve) => {
        setTimeout(() => {
            console.log(msg);
            resolve(msg)
        }, delay)
    })
}

// function asyncConcurrenceLimit(tasks, limit = 2) {
//     let count = 0
//     const result = []
//     const handle = (tasks) => {
//         while (tasks.length && limit >= count) {
//             count++
//             const task = tasks.shift()
//             task().then(res => {
//                 result.push(res)
//                 handle(tasks)
//             }).catch(() => {
//                 tasks.unshift(task)
//             }).finally(() => {
//                 count--

//             })
//         }
//     }
//     return handle(tasks)
// }
const t1 = createTask('task 1', 1000)
const t11 = createTask('task 1', 1000)
const t111 = createTask('task 1', 1000)
const t2 = createTask('task 2', 4000)
const t3 = createTask('task 3', 2000)
const t4 = createTask('task 4', 5000)

asyncConcurrenceLimit([t1, t11, t111, t2, t3, t4]).then(console.log)

function asyncConcurrenceLimit(array, limit = 2) {
    const tasks = []
    const doingTasks = []
    let i = 0
    const handle = () => {
        // 递归出口
        if (i === array.length) {
            return Promise.resolve()
        }
        const task = array[i++]()
        tasks.push(task)
        const doing = task.then(() => doingTasks.splice(doingTasks.indexOf(doing), 1))
        doingTasks.push(doing)
        const res = doingTasks.length >= limit ? Promise.race(doingTasks) : Promise.resolve()
        return res.then(handle)
    }
    return handle().then(() => Promise.all(tasks))
}