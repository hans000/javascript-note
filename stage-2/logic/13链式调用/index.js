/**
 * 测试Promise then方法的第二个参数和catch的优先级
 * then > catch
 */
// Promise.reject(1).then(function(value) {
//     console.log('success', value);
// }, function(value) {
//     console.log('error', value);
// }).catch(function(error) {
//     console.log('catch', error);
// })

function LazyMan(name) {
    this.name = name;
    this.queue = [];
    this.queue.push(() => {
        console.log(`hello this is ${this.name}`);
        return Promise.resolve(); 
    });
    let template = Promise.resolve();
    setTimeout(() => {
        while(this.queue.length) {
            template = template.then(this.queue.pop())
        }
    }, 0)
    // setTimeout(() => {
    //     this.queue.forEach(v => {
    //         template = template.then(v);
    //     });
    // }, 0)
}
LazyMan.prototype = {
    sleep(time) {
        this.queue.push(function() {
            return new Promise(function(resolve) {
                setTimeout(() => {
                    console.log(`暂停${time}s!`);
                    resolve();
                }, time * 1000);
            });
        })
        return this;
    },
    eat(food) {
        this.queue.push(function() {
            console.log(`正在吃 ${food}`);
            return Promise.resolve();
        })
        return this;
    }
}

// new LazyMan('jack').sleep(2).eat('shit').sleep(3).eat('shit');

function promisify(func) {
    return (...arg) => {
        return () => new Promise((resolve, reject) => {
            func(...arg, (err, arg) => {
                err ? reject(err) : resolve(arg)
            })
        })
    }
}

function test(text, callback) {
    setTimeout(() => {
        console.log(text);
        callback(null, 'ok')
    }, 1000);
}
const chain = []
chain.push(promisify(test)(1))
chain.push(promisify(test)(2))
chain.push(promisify(test)(3))

let handle = Promise.resolve()

setTimeout(() => {
    while (chain.length) {
        handle = handle.then(chain.shift())
    }
}, 0)