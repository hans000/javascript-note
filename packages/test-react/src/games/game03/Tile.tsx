import React, { useState } from "react";
import { clsx } from "../../utils";
import { DirKind, SpriteKind } from "./logic";

interface IProps {
    value: SpriteKind
    index: number
    onMove: (dir: DirKind) => void
}

export default function Tile(props: IProps) {
    const [hold, setHold] = useState(false)

    const valids = React.useMemo(
        () => {
            const flag = hold && (props.value === SpriteKind.Star || props.value === SpriteKind.Stone)
            const obj = {
                up: flag,
                right: flag,
                down: flag,
                left: flag,
            }
            return obj
        },
        [props.index, hold, props.value]
    )

    return (
        <div className={clsx({
            tile: true,
            'star': props.value === SpriteKind.Star,
            'stone': props.value === SpriteKind.Stone,
            'target': props.value === SpriteKind.Target,
        })} onClick={() => {
            if (props.value) {
                setHold(hold => !hold)
            }
        }}>
            { valids.up && <div className="up" onClick={(ev) => {
                ev.stopPropagation()
                setHold(false)
                props.onMove(DirKind.Up)
            }}></div> }
            { valids.right && <div className="right" onClick={(ev) => {
                ev.stopPropagation()
                setHold(false)
                props.onMove(DirKind.Right)
            }}></div> }
            { valids.down && <div className="down" onClick={(ev) => {
                ev.stopPropagation()
                setHold(false)
                props.onMove(DirKind.Down)
            }}></div> }
            { valids.left && <div className="left" onClick={(ev) => {
                ev.stopPropagation()
                setHold(false)
                props.onMove(DirKind.Left)
            }}></div> }
        </div>
    )
}