import { useEffect, useState } from "react"

const threshold = 50

/**
 * dir up -> 0 right -> 1 down -> 2 left -> 3
 */
export default function useGesture() {
    const [dir, setDir] = useState(0)
    const [startPos, setStartPos] = useState([0, 0])
    const [endPos, setEndPos] = useState([0, 0])

    function handleMouseDown(e: MouseEvent) {
        setStartPos([e.clientX, e.clientY])
        
    }
    function handleMouseUp(e: MouseEvent) {
        setEndPos([e.clientX, e.clientY])
    }
    function analyse(startPos: number[], endPos: number[]) {
        if (getDistance(startPos ,endPos) < threshold) {
            return -1
        }
        const [x1, y1] = startPos
        const [x2, y2] = endPos
        const dx = x2 - x1
        const dy = y2 - y1
        if (dx > dy) {
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
        return () => {
            window.removeEventListener('mousedown', handleMouseDown)
            window.removeEventListener('mouseup', handleMouseUp)
        }
    }, [])
    function mhandle(callback?: (dir: number) => void) {
        console.log('dir', dir);
    }
    useEffect(() => {
        const dir = analyse(startPos, endPos)
        setDir(dir)
        if (dir !== -1) {
            mhandle()
        }
    }, [JSON.stringify(endPos)])
  
    return mhandle
  }