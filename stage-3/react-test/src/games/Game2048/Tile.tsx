import React from "react";
import Core2048 from "./logic";

interface IProps {
    value: number,
    position: number,
}
const tileWidth = 75;

export default function(props: IProps) {
    const style: React.CSSProperties = {
        left: (props.position % Core2048.Scale) * tileWidth,
        top: (props.position / Core2048.Scale | 0) * tileWidth,
    }
    return (
        <div className={`tile tile${props.value}`} style={style}>{props.value ? props.value : ''}</div>
    )
}