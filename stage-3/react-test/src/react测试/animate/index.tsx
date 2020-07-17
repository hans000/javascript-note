import React, { Component } from 'react'
import './index.scss'

interface IState {
    top: number
}
export default class index extends Component<{}, IState> {
    public state: IState = {
        top: 50
    }
    private clickHandle = () => {
        this.setState({
            top: this.state.top === 50 ? 100 : 50
        })
    }
    render() {
        return (
            <div className='animate'>
                <button onClick={this.clickHandle}>click me</button>
                <div className='tile' style={{ top: this.state.top }}></div>
            </div>
        )
    }
}
