function clsx1(object: Record<string, boolean>) {
    return Object.keys(object).filter(key => !!object[key]).join(' ')
}



console.log(clsx1({
    foo: true,
    bar: false,
    baz: true,
}))

// foo baz

function clsx(...args: Array<Record<string, boolean> | string | null | undefined>) {
    return args.reduce<string[]>((acc, item) => {
        if (item) {
          if (typeof item === 'object') {
            Object.keys(item).forEach(key => {
              if (item[key]) {
                acc.push(key)
              }
            })
          } else {
            acc.push(item)
          }
        }
        return acc
    }, []).join(' ')
}

console.log(clsx('foo', {
    bar: true,
    baz: false,
}))

// foo bar