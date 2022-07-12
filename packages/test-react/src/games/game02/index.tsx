import React, { Component } from 'react'
import Pane from './Pane'
import './index.css'

export default class index extends Component {
    private isPress = false;
    private startPos = [0, 0];
    private dir = 0; // 方向 0 1 2 3 -> up right down left

    private onMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.persist()
        this.isPress = true
        console.log([e.clientX, e.clientY]);
        
    }
    private mouseUp = (e: MouseEvent) => {
        console.log([e.clientX, e.clientY]);

    }
    public componentDidMount() {
        window.addEventListener('mouseup', this.mouseUp)
    }
    public componentWillUnmount() {
        window.removeEventListener('mouseup', this.mouseUp)
    }
    render() {
        return (
            <div className="game2">
                <div className='layout'
                    onMouseDown={this.onMouseDown} >
                    <Pane />
                </div>
            </div>
        )
    }
}
