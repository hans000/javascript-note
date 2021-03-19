

function wrapApi(api) {
    let __counter__ = 0
    return (...args) => {
        const counter = ++__counter__
        __counter__ = counter
        return api(...args).then(res => {
            return {
                ...res,
                isNew: () => __counter__ === counter,
            }
        })
    }
}

const getAge = (age) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ age })
        }, 100)
    })
}
const getName = (name) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ name })
        }, 300)
    })
}
const getAgeWrap = wrapApi(getAge)
const getNameWrap = wrapApi(getName)

function onChange(age, name) {
    getAgeWrap(age).then(res => {
        if (res.isNew()) {
            console.log(res);
        }
    })
    getNameWrap(name).then(res => {
        if (res.isNew()) {
            console.log(res);
        }
    })
}

onChange(10, 'Tom')
onChange(20, 'Jack')