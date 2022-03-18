import React from "react";
import { DirKind } from "./logic";
import Tile from "./Tile";

interface IProps {
    data: number[]
    onMove: (index: number, dir: DirKind) => void
}

export default function Pane(props: IProps) {
    return (
        <div className="pane">
            {
                props.data.map((item, index) => {
                    return (
                        <Tile key={index} value={item} index={index} onMove={(dir) => props.onMove(index, dir)}/>
                    )
                })
            }
        </div>
    )
}