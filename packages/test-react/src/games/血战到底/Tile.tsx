import React, { Component } from 'react'

interface IProps {
    index: number
    value: boolean
    onClick: (index: number) => void
}
interface IState { }

export default class Tile extends Component<IProps, IState> {
    private clickHandle = () => {
        this.props.onClick(this.props.index)
    }
    render() {
        const cls = this.props.value ? 'tile mark' : 'tile'
        return (
            <div className={cls} onClick={this.clickHandle}></div>
        )
    }
}
