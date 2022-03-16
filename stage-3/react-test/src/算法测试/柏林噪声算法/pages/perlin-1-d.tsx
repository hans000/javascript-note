import { Select, Slider } from "antd";
import React, { useEffect, useRef } from "react";
import Perlin1Demision from "../logic/perlin-1-d";
import { FadeType } from "../utils";


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
            <div style={{ position: 'absolute', left: 800, top: 0 }}>
                <Select<FadeType> style={{ width: 200 }} defaultValue='fade' onChange={(value) => {
                    linearInsertRef.current.setFadeType(value)
                }}>
                    <Select.Option value='fade'>fade</Select.Option>
                    <Select.Option value='ease'>ease</Select.Option>
                    <Select.Option value='line'>line</Select.Option>
                    <Select.Option value='cos'>cos</Select.Option>
                </Select>
                <Slider step={0.1} style={{ width: 400 }} min={0} max={100} onChange={(value) => {
                    linearInsertRef.current.setOffset(value as number)
                }} />
                <Slider step={0.01} defaultValue={1} style={{ width: 400 }} min={0} max={2} onChange={(value) => {
                    linearInsertRef.current.setAmplitude(value as number)
                }} />
                <Slider step={0.01} defaultValue={1} style={{ width: 400 }} min={0.01} max={2} onChange={(value) => {
                    linearInsertRef.current.setFrequency(value as number)
                }} />
            </div>
        </div>
    )
}