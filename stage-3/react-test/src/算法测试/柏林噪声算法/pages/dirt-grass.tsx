import { Select, Slider } from "antd";
import React, { useEffect, useRef } from "react";
import DirtGrass from "../logic/dirt-grass";


export default function DirtGrassComponent() {
    const canvasRef = useRef<HTMLCanvasElement>()
    const dirtGrassRef = useRef<DirtGrass>()

    useEffect(
        () => {
            dirtGrassRef.current = new DirtGrass(canvasRef.current)
        },
        []
    )
    
    return (
        <div>
            <canvas style={{ border: '1px solid #eee' }} ref={canvasRef} width={800} height={600}></canvas>
            <div style={{ position: 'absolute', left: 800, top: 0 }}>
                <Slider step={1} defaultValue={255} style={{ width: 400 }} min={0} max={255} onChange={(value) => {
                    dirtGrassRef.current.setThreshold(value as number)
                }} />
                <Slider step={0.01} defaultValue={1} style={{ width: 400 }} min={0} max={1} onChange={(value) => {
                    dirtGrassRef.current.setOpacity(value as number)
                }} />
                <Slider step={1} defaultValue={0} style={{ width: 400 }} min={0} max={100} onChange={(value) => {
                    dirtGrassRef.current.setOffsetX(value as number)
                }} />
                <Slider step={1} defaultValue={0} style={{ width: 400 }} min={0} max={100} onChange={(value) => {
                    dirtGrassRef.current.setOffsetY(value as number)
                }} />
            </div>
        </div>
    )
}