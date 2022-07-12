import React, { useEffect, useRef, useState } from "react";
import Core2048 from "./logic";
import Tile from "./Tile";
import './index.less'

const instance = new Core2048()

export default function() {
    const containerRef = useRef(null)
    const [data, setData] = useState(instance.getMap())
    const [score, setScore] = useState(0)

    const handle = (code: number) => {
        const state = instance.getState()
        if (state === 'normal') {
            instance.move(code)
            setData(() => instance.getMap())
            setScore(() => instance.getScore())
        } else {
            const timer = setTimeout(() => {
                if (state === 'fail') {
                    alert('Game over!')
                } else if (state === 'finished') {
                    alert('恭喜完成挑战!')
                }
                clearTimeout(timer)
            }, 300)
        }
    }
    const handleKeyDown = (e: any) => {
        const code = e.keyCode
        if (code > 36 && code < 41) {
            handle(e.keyCode)
        }
    }
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown)
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        };
    }, [])
    return (
        <div className='game2048' ref={containerRef}>
            <div>
                <span>分数{score}</span>
            </div>
            <div className="pane">
                {
                    data.map((tile, index) => (
                        <Tile value={tile} key={index} position={index} />
                    ))
                }
            </div>
        </div>
    )
}