const PENDIGN = 'pending'
const RESOLVED = 'resolved'
const REJECTED = 'rejected'

class MyPromise {
	constructor(executor) {
		this.status = PENDIGN
		this.data = undefined
		this.callbacks = []
		
		const resolve = (value) => {
			if (this.status === PENDIGN) {
				this.data = value
				this.status = RESOLVED
				setTimeout(() => {
					this.callbacks.forEach(({ onfulfilled }) => onfulfilled())
				})
			}
		}
		const reject = (reason) => {
			if (this.status === PENDIGN) {
				this.data = reason
				this.status = REJECTED
				setTimeout(() => {
					this.callbacks.forEach(({ onrejected }) => onrejected())
				})
			}
		}
		try {
			executor(resolve, reject)
		} catch(e) {
			reject(e)
		}
	}
	catch(onrejected) {
		return this.then(undefined, onrejected)
	}
	then(onfulfilled, onrejected) {
		onfulfilled = typeof onfulfilled === 'function' ? onfulfilled : () => this.data
		onrejected = typeof onrejected === 'function' ? onrejected : () => { throw this.data }

		return new MyPromise((resolve, reject) => {
			const handle = (callback) => {
				try {
					const result = callback(this.data)
					result instanceof MyPromise ? result.then(resolve, reject) : resolve(result)
				} catch (error) {
					reject(error)
				}
			}

			if (this.status === PENDIGN) {
				this.callbacks.push({
					onfulfilled: () => handle(onfulfilled),
					onrejected: () => handle(onrejected),
				})
			} else {
				setTimeout(() => {
					this.status === RESOLVED ? handle(onfulfilled) : handle(onrejected)
				})
			}
		})
	}
}
MyPromise.resolved = (value) => {
	return new MyPromise((resolved) => {
		resolved(value)
	})
}
MyPromise.rejected = (reason) => {
	return new MyPromise((_, rejected) => {
		rejected(reason)
	})
}

const p1 = () => new MyPromise((resolve) => {
	console.log(1);
	// let p2 = new MyPromise((resolve) => {
	// 	console.log(2);
	// 	setTimeout(() => {	// 宏task 1
	// 		console.log(3);
	// 	}, 0)
	// 	resolve(5);
	// });
	resolve(6);
	// p2.then((arg) => {
	// 	console.log(arg);
	// });
})
setTimeout(() => {	// 宏task 1
	console.log(8);
	// new MyPromise(resolve => {
	// 	resolve(9);
	// }).then(res => {
	// 	console.log(res)
	// })
}, 0)
p1().then((arg) => {
	console.log(arg);
});
console.log(10);
// 1 2 10 5 6 8 9 3