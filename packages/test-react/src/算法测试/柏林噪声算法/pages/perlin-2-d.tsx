import { Slider } from "antd";
import React, { useEffect, useRef } from "react";
import Perlin2Demision from "../logic/perlin-2-d";


export default function Perlin2DimisionComponent() {
    const canvasRef = useRef<HTMLCanvasElement>()
    const linearInsertRef = useRef<Perlin2Demision>()

    useEffect(
        () => {
            linearInsertRef.current = new Perlin2Demision(canvasRef.current)
        },
        []
    )
    
    return (
        <div>
            <canvas style={{ border: '1px solid #eee' }} ref={canvasRef} width={800} height={600}></canvas>
            <div style={{ position: 'absolute', left: 800, top: 0 }}>
                <Slider style={{ width: 400 }} onChange={(value) => {
                    linearInsertRef.current.setOffsetX(value as number)
                }} step={.1} min={0} max={100}></Slider>
                <Slider style={{ width: 400 }} onChange={(value) => {
                    linearInsertRef.current.setOffsetY(value as number)
                }} step={.1} min={0} max={100}></Slider>
                <Slider style={{ width: 400 }} onChange={(value) => {
                    linearInsertRef.current.setR(value as number)
                }} step={1} min={0} max={255}></Slider>
                <Slider style={{ width: 400 }} onChange={(value) => {
                    linearInsertRef.current.setG(value as number)
                }} step={1} min={0} max={255}></Slider>
                <Slider style={{ width: 400 }} onChange={(value) => {
                    linearInsertRef.current.setB(value as number)
                }} step={1} min={0} max={255}></Slider>
            </div>
        </div>
    )
}