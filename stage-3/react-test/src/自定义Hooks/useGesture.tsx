import { useEffect, useRef, useState } from "react"

const threshold = 50

/**
 * dir up -> 0 right -> 1 down -> 2 left -> 3
 */
export default function useGesture(callback: (dir: number) => void) {
    const pressedRef = useRef(false)
    const startPosRef = useRef([0, 0])
    const endPosRef = useRef([0, 0])
    const [index, setIndex] = useState(0)

    function handleMouseDown(e: MouseEvent) {
        pressedRef.current = true
        startPosRef.current = [e.clientX, e.clientY]
    }
    function handleMouseMove(e: MouseEvent) {
        if (pressedRef.current) {
            endPosRef.current = [e.clientX, e.clientY]
        }
    }
    function handleMouseUp(e: MouseEvent) {
        pressedRef.current = false
        setIndex(index => index + 1)
    }
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
        window.addEventListener('mousedown', handleMouseDown)
        window.addEventListener('mouseup', handleMouseUp)
        window.addEventListener('mousemove', handleMouseMove)
        return () => {
            window.removeEventListener('mousedown', handleMouseDown)
            window.removeEventListener('mouseup', handleMouseUp)
            window.removeEventListener('mousemove', handleMouseMove)
        }
    }, [])
    useEffect(() => {
        const startPos = startPosRef.current
        const endPos = endPosRef.current
        const dir = analyse(startPos, endPos)
        if (dir !== -1) {
            callback(dir)
        }
    }, [index])
}