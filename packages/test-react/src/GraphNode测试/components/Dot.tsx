import { useMemo, useRef, useState } from "react"
import styled from "styled-components"
import { clsx } from "../../utils"

const Wrapper = styled.div`
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: green;
    cursor: pointer;
    &.active {
        background-color: orange;
    }
    &:hover {
        background-color: orange;
    }
`

export default function Dot(props: {
    className?: string
    style?: React.CSSProperties
    onClick?: () => void
    isFirstNode: boolean
}) {
    const wrapperRef = useRef<HTMLDivElement>(null)
    const [startPoint, setStartPoint] = useState<[number, number] | null>(null)
    const [endPoint, setEndPoint] = useState<[number, number] | null>(null)
    const [active, setActive] = useState(false)
    
    const d = useMemo(() => {
        if (startPoint && endPoint) {
            const [x1, y1] = startPoint
            const [x2, y2] = endPoint
            const d = (x1 + x2) / 2
            return `M ${x1} ${y1} C${d} ${y1} ${d} ${y2} ${x2} ${y2} l-1 0 l-5 -5 m5 5 l-5 5`
        }
        return ''
    }, [startPoint, endPoint])

    return (
        <Wrapper ref={wrapperRef} onClick={() => {
            if (! props.isFirstNode) {
                setActive(true)
                if (wrapperRef.current) {
                    const { x, y } = wrapperRef.current.getBoundingClientRect()
                    setStartPoint([x, y])
                    window.addEventListener('mousemove', (e) => {
                        setEndPoint([e.clientX, e.clientY])
                    })
                }
            }

            props.onClick?.()
        }} style={props.style} className={clsx({
            [props.className!]: true,
            active,
        })}>
            {
                !!startPoint && !! endPoint && (
                    <svg style={{ position: 'absolute', left: 0, top: 0 }}>
                        <path d={d} strokeWidth={2} stroke="green" fill="transparent"></path>
                    </svg>
                )
            }
        </Wrapper>
    )
}