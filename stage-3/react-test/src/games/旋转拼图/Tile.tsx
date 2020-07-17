import React, { Component } from 'react'
import { G_WIDTH, ROW } from './logic'

interface IProps {
    value: number;
}
interface IState {}

export default class Tile extends Component<IProps, IState> {
    render() {
        const width = G_WIDTH / ROW
        return (
            <div className={`tile tile-${this.props.value}`} style={{ width, height: width }}> </div>
        )
    }
}
