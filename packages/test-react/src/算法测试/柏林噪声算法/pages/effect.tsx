import React, { useEffect, useRef } from "react";
import Effect from "../logic/effect";


export default function EffectComponent() {
    const canvasRef = useRef<HTMLCanvasElement>()
    const effectRef = useRef<Effect>()

    useEffect(
        () => {
            effectRef.current = new Effect(canvasRef.current)
        },
        []
    )
    
    return (
        <div>
            <canvas style={{ border: '1px solid #eee' }} ref={canvasRef} width={800} height={600}></canvas>
            <div style={{ position: 'absolute', left: 800, top: 0 }}>
                
            </div>
        </div>
    )
}