import React, { Component } from 'react';
import Pane from './Pane';
import { initData, turn, getRandNum } from './logic';
import './index.scss'

interface IState {
    data: number[];
}

export default class RotateJigsaw extends Component<{}, IState> {
    public static dataString = JSON.stringify(initData());
    private data: number[];
    private isRunning = false;

    public state: IState = {
        data: initData()
    }
    private clickHandle = (index: number) => {
        const data = turn(this.state.data, index)
        this.setState({ data })
        if (this.isRunning) {
            if (JSON.stringify(data) === RotateJigsaw.dataString) {
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
            data: initData()
        })
    }
    private generate = () => {
        let count = Pane.dotList.length
        let data = this.state.data;
        this.isRunning = true;

        while (count--) {
            const num = Pane.dotList[getRandNum(Pane.dotList.length)]
            data = turn(data, num)
        }
        this.data = data
        this.setState({
            data
        })
    }
    public render() {
        return (
            <div className='four-colors-pane'>
                <div className="ctrl">
                    <button onClick={this.reset}>重置</button>
                    <button onClick={this.clear}>清空</button>
                    <button onClick={this.generate}>生成</button>
                </div>
                <Pane data={this.state.data} onClick={this.clickHandle}/>
            </div>
        )
    }
}
