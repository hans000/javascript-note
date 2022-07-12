export function clsx(...args: Array<Record<string, boolean> | string | boolean | null | undefined>) {
    return args.reduce(
        (acc, arg) => {
            if (arg) {
                if (typeof arg === 'string') {
                    acc.push(arg)
                }
                if (typeof arg === 'object') {
                    Object.keys(arg).forEach(key => {
                        if (arg[key]) {
                            acc.push(key)
                        }
                    })
                }
            }
            return acc
        },
        []
    ).join(' ')
}