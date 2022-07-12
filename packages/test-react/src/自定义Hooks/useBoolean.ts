import { useState, useMemo } from "react"

interface Actions {
    setTrue: () => void;
    setFalse: () => void;
    toggle: (value?: boolean) => void;
}

export default function useBoolean(defaultValue: boolean) {
    const [state, setState] = useState(defaultValue)

    const action: Actions = useMemo(() => {
        const toggle = (value?: boolean) => setState(() => value)
        const setTrue = () => setState(() => true)
        const setFalse = () => setState(() => false)
        return { setTrue, setFalse, toggle }
    }, [])

    return [state, action]
}