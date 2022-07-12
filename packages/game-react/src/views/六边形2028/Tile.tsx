import React from 'react'

interface IProps {
    index: number
    value: number
    onClick: (index: number) => void
}
interface IState { }

export default (props: IProps) => {
    const clickHandle = () => {
        props.onClick(props.index)
    }
    const cls = props.value === 16 ? 'tile mark' : 'tile'
    return (
        <div className={cls} onClick={clickHandle}>{props.value}</div>
    )
}
