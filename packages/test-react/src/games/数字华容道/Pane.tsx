import React, { Component } from 'react'
import Tile from './Tile'

interface IProps {
    data: number[]
    onClick: (index: number) => void
}
interface IState { }

export default class Pane extends Component<IProps, IState> {
    render() {
        return (
            <div className='pane'>
                {
                    this.props.data.map((v, i) => (
                        <Tile key={i} value={v} index={i} onClick={this.props.onClick} />
                    ))
                }
            </div>
        )
    }
}
