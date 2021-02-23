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
MyPromise.all = (promiseList) => {
	let count = 0
	const result = []
	return new MyPromise((resolve, reject) => {
		for (let i = 0; i < promiseList.length; i++) {
			let p = promiseList[i];
			if (!(p instanceof MyPromise)) {
				p = Promise.resolve(p)
			}
			p.then((value) => {
				result[i] = value
				count++
				if (count === promiseList.length) {
					resolve(result)
				}
			}).catch(err => {
				reject(err)
				return
			})
		}
	})
}
MyPromise.race = (promiseList) => {
	return new MyPromise((resolved, reject) => {
		for (let i = 0; i < promiseList.length; i++) {
			let p = promiseList[i];
			if (!(p instanceof MyPromise)) {
				p = Promise.resolve(p)
			}
			p.then((value) => {
				resolved(value)
				return
			}).catch(err => {
				reject(err)
				return
			})
		}
	})
}
MyPromise.allSettled = (promiseList) => {
	let count = 0
	const result = []
	return new MyPromise((resolve, reject) => {
		for (let i = 0; i < promiseList.length; i++) {
			let p = promiseList[i];
			if (!(p instanceof MyPromise)) {
				p = Promise.resolve(p)
			}
			p.then((value) => {
				result[i] = { status: 'fulfilled', value, }
				count++
				if (count === promiseList.length) {
					resolve(result)
				}
			}).catch(reason => {
				result[i] = { status: 'rejected', reason, }
				count++
				if (count === promiseList.length) {
					reject(result)
				}
			})
		}
	})
}

const createTask = (task, delay = 1000, flag = false) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			console.log('task', task);
			flag ? reject(`reject ${task}`) : resolve(task)
		}, delay);
	})
}

// MyPromise.all([
// 	createTask(1, 1000),
// 	createTask(2, 2000),
// 	createTask(3, 1000),
// ]).then(result => {
// 	console.log(result);
// })
// Promise.race([
// 	createTask(1, 1000),
// 	createTask(2, 2000, true),
// 	createTask(3, 1000),
// ]).then(result => {
// 	console.log('result', result);
// }).catch(err => {
// 	console.log('err', err);
// })
MyPromise.allSettled([
	createTask(1, 1000),
	createTask(2, 2000, true),
	createTask(3, 1000),
]).then(result => {
	console.log('result', result);
}).catch(err => {
	console.log('err', err);
})

// const p1 = () => new MyPromise((resolve) => {
// 	console.log(1);
// 	// let p2 = new MyPromise((resolve) => {
// 	// 	console.log(2);
// 	// 	setTimeout(() => {	// 宏task 1
// 	// 		console.log(3);
// 	// 	}, 0)
// 	// 	resolve(5);
// 	// });
// 	resolve(6);
// 	// p2.then((arg) => {
// 	// 	console.log(arg);
// 	// });
// })
// setTimeout(() => {	// 宏task 1
// 	console.log(8);
// 	// new MyPromise(resolve => {
// 	// 	resolve(9);
// 	// }).then(res => {
// 	// 	console.log(res)
// 	// })
// }, 0)
// p1().then((arg) => {
// 	console.log(arg);
// });
// console.log(10);
// 1 2 10 5 6 8 9 3
