import React, { useState } from "react";
import useGesture from "../../hooks/useGesture";
import './index.css'
import { Logic } from "./logic";
import Pane from "./Pane";

const game = new Logic([
    0, 0, 0, 0, 0, 0, 0, 1,
    0, 2, 0, 0, 0, 1, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 1, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 3, 0, 0, 1,
    0, 0, 0, 0, 0, 1, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    1, 0, 1, 0, 0, 1, 0, 0,
])

export default function Game03() {

    const [data, setData] = useState(game.getMap())
    const ref = useGesture<HTMLDivElement>((dir) => {
        console.log(dir)
    })

    return (
        <div ref={ref} className="game03">
            <Pane data={data} onMove={(index, dir) => {
                setData(game.move(index, dir))
                setTimeout(() => {
                    if (game.isOk()) {
                        alert('success')
                    }
                }, 0);
            }} />
        </div>
    )
}