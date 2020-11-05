import { useCallback, useRef, useState } from "react"

/**
 * 自定义hooks
 * 双向数据绑定
 * @param initState 初始参数
 * @returns [data, { setForm, resetForm } ]
 */
export default function useForm<T>(initState: T): [
    T,
    {
        setForm: (partialState: Partial<T>) => void,
        resetForm: () => T,
    }
] {
    const dataRef = useRef<T>(initState)
    const [, forceUpdate] = useState(null)

    const setForm = useCallback(
        (partialState: Partial<T>) => {
            dataRef.current = {
                ...dataRef.current,
                ...partialState,
            }
            forceUpdate(partialState)
        },
        [],
    )
    const resetForm = useCallback(
        () => {
            dataRef.current = initState
            forceUpdate(initState)
            return { ...initState }
        },
        [],
    )

    return [dataRef.current, { setForm, resetForm }]
}