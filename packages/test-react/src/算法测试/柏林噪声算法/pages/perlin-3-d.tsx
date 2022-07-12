import { Slider } from "antd";
import React, { useEffect, useRef } from "react";
import Perlin3Demision from "../logic/perlin-3-d";


export default function Perlin3DimisionComponent() {
    const canvasRef = useRef<HTMLCanvasElement>()
    const linearInsertRef = useRef<Perlin3Demision>()

    useEffect(
        () => {
            linearInsertRef.current = new Perlin3Demision(canvasRef.current)
        },
        []
    )
    
    return (
        <div>
            <canvas style={{ border: '1px solid #eee' }} ref={canvasRef} width={800} height={600}></canvas>
            <div style={{ position: 'absolute', left: 800, top: 0 }}>
                <Slider style={{ width: 200 }} onChange={(value) => {
                    linearInsertRef.current.setOffsetX(value as number)
                }} step={.1} min={0} max={100}></Slider>
                <Slider style={{ width: 200 }} onChange={(value) => {
                    linearInsertRef.current.setOffsetY(value as number)
                }} step={.1} min={0} max={100}></Slider>
            </div>
        </div>
    )
}