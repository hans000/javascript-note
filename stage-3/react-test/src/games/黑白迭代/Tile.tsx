import React, { Component } from 'react'
import { convert } from '.'

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
            <div className={cls} title={convert(this.props.index).join(',')} onClick={this.clickHandle}></div>
        )
    }
}
