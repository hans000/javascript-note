const PENDING = 'PENDING'
const RESOLVED = 'RESOLVED'
const REJECTED = 'REJECTED'

class MyPromise {
	constructor(executor) {
		this.status = PENDING
		this.value = undefined
		this.reason = undefined
		this.onResolvedCallbacks = []
		this.onRejectedCallbacks = []
		let resolve = (value) => {
			if (this.status === PENDING) {
				this.value = value
				this.status = RESOLVED
				this.onResolvedCallbacks.forEach(fn => fn())
			}
		}
		let reject = (reason) => {
			if (this.status === PENDING) {
				this.reason = reason
				this.status = REJECTED
				this.onRejectedCallbacks.forEach(fn => fn())
			}
		}
		try {
			executor(resolve, reject)
		} catch(e) {
			reject(e)
		}
	}
	catch(onrejected) {
		if (this.status === REJECTED) {
			onrejected(this.reason)
			return this
		}
		if (this.status === PENDING) {
			this.onRejectedCallbacks.push(() => {
				onrejected(this.reason)
			})
			return this
        }
	}
	then(onfulfilled, onrejected) {
		if (this.status === RESOLVED) {
			onfulfilled(this.value)
			return this
		}
		if (this.status === REJECTED) {
			onrejected(this.reason)
			return this
		}
		if (this.status === PENDING) {
			this.onResolvedCallbacks.push(() => {
				onfulfilled(this.value)
			})
			this.onRejectedCallbacks.push(() => {
				onrejected(this.reason)
			})
			return this
        }
	}
}

const promise = new MyPromise((resolve) => {
    setTimeout(() => {
        resolve(12)
    }, 1000)
})
console.log('start')
promise.then(value => {
    console.log(value)
})
promise.then(value => {
    console.log(value)
})
MyPromise.resolve(123)

Promise.resolve()