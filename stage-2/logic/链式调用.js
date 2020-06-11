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

new LazyMan('jack').sleep(2).eat('shit').sleep(3).eat('shit');
