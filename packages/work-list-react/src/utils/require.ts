const modules: Record<string, any> = {}

class AsyncQueue {
    private _tasks: (() => Promise<any>)[] = []
    private _index = 0
    private _count = 0

    public push(fn: () => Promise<any>) {
        if (! this._tasks.length) {
            setTimeout(() => this._run())
        }
        this._tasks.push(fn)
    }

    private _run() {
        let promise = Promise.resolve()
        for (; this._index < this._tasks.length; this._index++) {
            const task = this._tasks[this._index]
            promise = promise.then(() => task()).then(() => {
                this._count++
                if (this._count === this._index && this._count < this._tasks.length) {
                    this._tasks.splice(0, this._index)
                    this._index = 0
                    this._count = 0
                    this._run()
                }
            })
        }
    }
}

const queue = new AsyncQueue()

function require(path: string) {
    const module = modules[path]
    if (!module) {
        throw new Error('failed to require "' + path + '"')
    }
    return module
}

interface RequireConfig {
    name: string
    path?: string
    fn?: () => void
    var?: string
}

function mounted(config: RequireConfig, fn: Function = config.fn!) {
    modules[config.name] = fn
    if (config.var) {
        //@ts-ignore
        window[config.var] = fn
    }
}

require.register = function (config: RequireConfig) {
    queue.push(() => {
        if (config.fn) {
            return Promise.resolve().then(() => {
                mounted(config)
            })
        }
        return runScript(config.path!, config).then(fn => {
            mounted(config, fn)
        }).catch((err) => {
            if (modules[config.name] !== err) {
                throw err
            }
        })
    })
}

function runScript(path: string, config: RequireConfig) {
    const cachedModule = modules[config.name]
    if (cachedModule) {
        return Promise.reject(cachedModule)
    }

    return fetch(path)
        .then(res => res.text())
        .then(code => eval(`
                ;((ctx) => {
                    const module = {
                        exports: null
                    }
                    ${code}
                    return module.exports
                })(${JSON.stringify(config)})
            `))
}


export default require