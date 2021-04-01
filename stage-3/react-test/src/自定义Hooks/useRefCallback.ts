import { useCallback, useEffect, useRef } from "react"

export default function useRefCallback<T extends (...args: any[]) => any>(fn: T, dependencies: any[]) {
    const ref = useRef<T>(fn)
    // 每次调用的时候，fn 都是一个全新的函数，函数中的变量有自己的作用域
    // 当依赖改变的时候，传入的 fn 中的依赖值也会更新，这时更新 ref 的指向为新传入的 fn
    useEffect(() => (ref.current = fn), [fn, ...dependencies])

    return useCallback(() => ref.current(), [ref]) as T
}