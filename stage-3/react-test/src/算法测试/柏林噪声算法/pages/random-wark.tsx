import { Checkbox, Slider } from "antd"
import React, { useRef, useEffect } from "react"
import RandomWalk from "../logic/random-walk"

export default function RandomWalkComponent() {
    const canvasRef = useRef<HTMLCanvasElement>()
    const linearInsertRef = useRef<RandomWalk>()

    useEffect(
        () => {
            linearInsertRef.current = new RandomWalk(canvasRef.current)
        },
        []
    )
    
    return (
        <div>
            <canvas style={{ border: '1px solid #eee' }} ref={canvasRef} width={800} height={600}></canvas>
            <div>
                <Checkbox onChange={() => {
                    
                }}>启用柏林算法</Checkbox>
            </div>
        </div>
    )
}