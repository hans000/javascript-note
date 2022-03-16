import { Slider } from "antd";
import React, { useEffect, useRef } from "react";
import Wave from "../logic/wave";


export default function WaveComponent() {
    const canvasRef = useRef<HTMLCanvasElement>()
    const linearInsertRef = useRef<Wave>()

    useEffect(
        () => {
            linearInsertRef.current = new Wave(canvasRef.current)
        },
        []
    )
    
    return (
        <div>
            <canvas style={{ border: '1px solid #eee' }} ref={canvasRef} width={800} height={600}></canvas>
        </div>
    )
}