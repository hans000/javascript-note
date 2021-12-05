import React, { useEffect, useRef } from "react";
import LinearInsert from "../logic/linear-insert";


export default function LinearInsertComponent() {
    const canvasRef = useRef<HTMLCanvasElement>()
    const linearInsertRef = useRef<LinearInsert>()

    useEffect(
        () => {
            linearInsertRef.current = new LinearInsert(canvasRef.current)
        },
        []
    )
    
    return (
        <div>
            <canvas style={{ border: '1px solid #eee' }} ref={canvasRef} width={800} height={600}></canvas>
        </div>
    )
}