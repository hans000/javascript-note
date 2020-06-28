import { useState, useEffect } from "react";


export default function useSessionStorage<T>(key: string, defaultValue: T) {
    const [state, setState] = useState()

    useEffect(() => {
        sessionStorage.setItem(key, JSON.stringify(defaultValue))
    }, [key, defaultValue])

    return [state, ]
}