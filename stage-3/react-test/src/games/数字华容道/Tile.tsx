import React, { Component } from 'react'

interface IProps {
    index: number
    value: number
    onClick: (index: number) => void
}
interface IState { }

export default class Tile extends Component<IProps, IState> {
    private clickHandle = () => {
        this.props.onClick(this.props.index)
    }
    render() {
        const cls = this.props.value === 16 ? 'tile mark' : 'tile'
        return (
            <div className={cls} onClick={this.clickHandle}>{this.props.value}</div>
        )
    }
}
