import React from 'react'

interface IProps {
    index: number
    value: number
    onClick: (index: number, mode: string, offset: number) => void
    scale: number
}

export default (props: IProps) => {
    const clickHandle = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const { left, top, width, height } = (event.target as HTMLDivElement).getBoundingClientRect()
        const x = event.clientX - left
        const y = event.clientY - top
        const h = height / 2
        const w = width / 2
        const dx = x - w
        const dy = y - h
        const arc = Math.atan2(dy, dx)
        const rate = 2 * arc / Math.PI
        let offset = 0, mode = 'vertical'
        // up -1.5 -0.5
        // down 0.5 -1.5
        // right -0.5 0.5
        // left 1.5-2  -2 -1.5
        if (rate > -1.5 && rate <= -0.5) {
            offset = 0
            mode = 'horizontal'
        } else if (rate > 0.5 && rate <= 1.5) {
            offset = props.scale
            mode = 'horizontal'
        } else if (rate > -0.5 && rate <= 1.5) {
            offset = (props.index / props.scale | 0) + 1
        } else {
            offset = props.index / props.scale | 0
        }
        props.onClick(props.index, mode, offset)
    }
    return (
        <div className={'tile'} onClick={clickHandle}>{props.value > 1 ? props.value : ''}</div>
    )
}
