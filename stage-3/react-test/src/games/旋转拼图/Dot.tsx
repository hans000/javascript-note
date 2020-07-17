import React, { Component } from 'react'
import { ROW, G_WIDTH, ROW_DOT, WIDTH_DOT } from './logic'

interface IProps {
    index: number;
    value: number;
    onClick: (index: number) => void;
}
interface IState {}

export default class Dot extends Component<IProps, IState> {
    private clickHandle = () => {
        this.props.onClick(this.props.value)
    }
    render() {
        const row = (this.props.index / ROW_DOT | 0) + 1
        const col = this.props.index % ROW_DOT + 1
        const unit = G_WIDTH / ROW
        const top = row * unit - WIDTH_DOT / 2 + 10
        const left = col * unit - WIDTH_DOT / 2 + 10
        return (
            <div className='dot' style={{ top, left }} onClick={this.clickHandle}>↻</div>
        )
    }
}
