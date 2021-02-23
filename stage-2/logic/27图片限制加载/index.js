
const fetch = (url) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(url);
            resolve(url)
        }, 1000);
    })
}

// function fetchImageLimit(urls, limit = 3) {
//     const data = []
//     const length = Math.min(limit, urls.length)
//     const running = Array.from({ length }, (_, index) => () => handle(fetch(urls[index])))
//     const pending = urls.splice(length).map(url => () => handle(fetch(url)))
//     function handle(task) {
//         task.then((result) => {
//             data.push(result)
//             if (pending.length) {
//                 pending.shift()()
//             }
//         })
//     }
//     running.forEach(func => {
//         func()
//     })
// }

// fetchImageLimit([
//     1,2,3,4,5,6,7,8
// ])

function fetchImageWithLimit(imageUrls, limit = 3) {
    const urls = [...imageUrls]
    const rs = new Map()
    
    const handle = () => {
        if(urls.length) {
            return fetch(urls.shift()).then(res => {
                rs.set(url, res)
                return handle()
            })
        }
    }
  
    const length = Math.min(limit, imageUrls.length)
    const promiseList = Array.from({ length }, () => Promise.resolve().then(handle))
      
    return Promise.all(promiseList).then(() => imageUrls.map(item => rs.get(item)))
}

fetchImageWithLimit([
    1,2,3,4,5,6,7
]).then(console.log)

