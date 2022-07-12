import { useEffect, useState } from "react"

export default function useMatchMedia(query: string) {
    const [matched, setMatched] = useState(window.matchMedia(query).matches)

    useEffect(
        () => {
            const handle = (ev: MediaQueryListEvent) => {
                setMatched(ev.matches)
                console.log(document.documentElement.offsetWidth <= 960, document.documentElement.offsetWidth)
            }
            const mediaQueryList = window.matchMedia(query)
            mediaQueryList.addEventListener('change', handle)
            setMatched(mediaQueryList.matches)
            return () => {
                mediaQueryList.removeEventListener('change', handle)
            }
        },
        []
    )

    return matched
}