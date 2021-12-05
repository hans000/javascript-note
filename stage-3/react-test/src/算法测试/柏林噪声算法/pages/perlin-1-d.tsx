import { Slider } from "antd";
import React, { useEffect, useRef } from "react";
import Perlin1Demision from "../logic/perlin-1-d";


export default function Perlin1DimisionComponent() {
    const canvasRef = useRef<HTMLCanvasElement>()
    const linearInsertRef = useRef<Perlin1Demision>()

    useEffect(
        () => {
            linearInsertRef.current = new Perlin1Demision(canvasRef.current)
        },
        []
    )
    
    return (
        <div>
            <canvas style={{ border: '1px solid #eee' }} ref={canvasRef} width={800} height={600}></canvas>
            <div>
                <Slider step={0.1} style={{ width: 400 }} min={0} max={100} onChange={(value) => {
                    linearInsertRef.current.setOffset(value as number)
                }} />
                <Slider step={0.1} style={{ width: 400 }} min={0} max={100} onChange={(value) => {
                    linearInsertRef.current.setOffset2(value as number)
                }} />
            </div>
        </div>
    )
}