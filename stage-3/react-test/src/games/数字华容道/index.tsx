import React, { Component } from 'react';
import Pane from './Pane';
import { initData, exchange, clear } from './logic';
import './index.css'

interface IState {
    data: number[];
}

export default class NumberPuzzle extends Component<{}, IState> {
    private static dataString = JSON.stringify(clear())
    private data: number[] = clear();
    private isRunning = false;

    public state: IState = {
        data: clear()
    }
    private clickHandle = (index: number) => {
        const data = exchange(this.state.data, index)
        this.setState(() => ({ data }))
        if (this.isRunning) {
            if (JSON.stringify(data) === NumberPuzzle.dataString) {
                alert('挑战成功！')
            }
        }
    }
    private reset = () => {
        this.isRunning = true;
        this.setState({
            data: this.data
        })
    }
    private clear = () => {
        this.isRunning = false;
        this.setState({
            data: clear()
        })
    }
    private generate = () => {
        this.isRunning = true
        const data = initData()
        this.data = data
        this.setState({
            data
        })
    }
    public render() {
        return (
            <div className='number-puzzle'>
                <div className="ctrl">
                    <h1>数字华容道</h1>
                    <button onClick={this.reset}>重置</button>
                    <button onClick={this.clear}>还原</button>
                    <button onClick={this.generate}>生成</button>
                </div>
                <Pane data={this.state.data} onClick={this.clickHandle}/>
            </div>
        )
    }
}
