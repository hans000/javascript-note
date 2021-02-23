class Scheduler {
    constructor(limit = 2) {
        this.running = []
        this.pending = []
        this.limit = limit
    }
    add(task) {
        if (this.running.length === this.limit) {
            new Promise(resolve => this.pending.push(() => this.execute(task, resolve)))
        } else {
            new Promise(resolve => this.execute(task, resolve))
        }
    }
    execute(task, resolve) {
        this.running.push(task)
        task().then(() => {
            resolve()
            this.running = this.running.filter(item => item !== task)
            if (this.pending.length) {
                this.pending.shift()()
            }
        })
    }
}

const createTask = (msg, delay) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(msg);
            resolve(msg)
        }, delay)
    })
}

// const scheduler = new Scheduler()
// scheduler.add(() => createTask(1, 1000))
// scheduler.add(() => createTask(2, 4000))
// scheduler.add(() => createTask(3, 1000))
// scheduler.add(() => createTask(4, 1000))
// scheduler.add(() => createTask(5, 1000))

Promise.race([createTask(1, 1000), createTask(2, 200)]).then(data => {
    console.log('data', data);
})

