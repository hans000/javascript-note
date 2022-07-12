import { useEffect, useRef, useState } from "react"

interface ContextProps {
    dir: number
    startPoints: [number, number]
    endPoints: [number, number]
}

/**
 * dir up -> 0 right -> 1 down -> 2 left -> 3
 */
export default function useGesture<T extends HTMLElement>(callback: (ctx: ContextProps) => void) {
    const pressedRef = useRef(false)
    const startPosRef = useRef<[number, number]>([0, 0])
    const endPosRef = useRef<[number, number]>([0, 0])
    const [index, setIndex] = useState(0)
    const panelRef = useRef<T>(null)
    const threshold = 50

    function analyse(startPos: number[], endPos: number[]) {
        if (getDistance(startPos ,endPos) < threshold) {
            return -1
        }
        const [x1, y1] = startPos
        const [x2, y2] = endPos
        const dx = x2 - x1
        const dy = y2 - y1
        if (Math.abs(dx) > Math.abs(dy)) {
            return dx > 0 ? 1 : 3
        } else {
            return dy > 0 ? 2 : 0
        }
    }
    
    function getDistance(startPos: number[], endPos: number[]) {
        const [x1, y1] = startPos
        const [x2, y2] = endPos
        return Math.pow((x1 - x2) ** 2 + (y1 - y2) ** 2, 0.5)
    }

    useEffect(() => {
        function handleMouseDown(e: MouseEvent) {
            pressedRef.current = true
            startPosRef.current = [e.clientX, e.clientY]
        }
        function handleMouseUp(e: MouseEvent) {
            if (pressedRef.current) {
                endPosRef.current = [e.clientX, e.clientY]
                pressedRef.current = false
                setIndex(index => index + 1)
            }
        }
        const node = panelRef.current
        node.addEventListener('mousedown', handleMouseDown)
        window.addEventListener('mouseup', handleMouseUp)
        return () => {
            node.removeEventListener('mousedown', handleMouseDown)
            window.removeEventListener('mouseup', handleMouseUp)
        }
    }, [])
    
    useEffect(() => {
        const startPos = startPosRef.current
        const endPos = endPosRef.current
        const dir = analyse(startPos, endPos)
        if (dir !== -1) {
            callback({
                dir: dir,
                startPoints: startPosRef.current,
                endPoints: endPosRef.current,
            })
        }
    }, [index])

    return panelRef
}