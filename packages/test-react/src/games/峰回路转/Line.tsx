import React from "react"

interface IProps {
    mode: 'vertical' | 'horizontal'
    index: number
    scale: number
    value: number
    onClick: (index: number) => void
}
export default (props: IProps) => {
    const cls = ['line', props.mode]
    if (props.value) {
        cls.push('mark')
    }
    const style: React.CSSProperties = props.mode === 'vertical'
        ? {
            top: (props.index / props.scale | 0) * 58 + 8,
            left: props.index % props.scale * 58,
        }
        : {
            top: (props.index / props.scale | 0) * 58,
            left: props.index % props.scale * 58 + 8,
        }
    const clickHandle = () => {
        props.onClick(props.index)
    }
    return (
        <div onClick={clickHandle} className={cls.join(' ')} style={style}></div>
    )
}