import React, { Component } from 'react'
import Pane from './Pane'
import './index.css'

interface IProps { }
interface IState {
    data: boolean[]
}

const ROW = 8

function turn(sourceData: boolean[], index: number) {
    const data = [...sourceData]
    const offset = [-1, 0, 0, 1, 1, 0, 0, -1]
    // 自身取反
    data[index] = !data[index]
    
    // 查找四周，取反
    for (let i = 0; i < offset.length; i+=2) {
        const oy = offset[i]
        const ox = offset[i + 1]
        const newIndex = index + oy * ROW + ox
        // 排除非法边界
        if (newIndex < 0 || 
            newIndex >= ROW * ROW || 
            index % ROW === 0 && newIndex + 1 === index ||
            (index + 1) % ROW === 0 && newIndex - 1 === index) {
            continue
        }
        data[newIndex] = !data[newIndex]
    }
    return data
}
function getFlipX(index: number) {
    const row = index / ROW | 0
    const col = index % ROW
    return ROW * row + 7 - col
}
function countBlackTiles(data: boolean[]) {
    return data.reduce((s, v) => v ? s + 1 : s, 0)
}
export default class BlackWhiteTurn extends Component<IProps, IState> {
    private isRunning = false;

    public state: IState = {
        data: Array.from({ length: ROW ** 2 }, () => false)
    }
    private clickHandle = (index: number) => {
        const data = turn(this.state.data, index)
        this.setState({
            data
        }, () => {
            if (this.isRunning) {
                const isOver = this.state.data.every(v => v === false)
                if (isOver) {
                    alert('挑战成功！')
                    this.isRunning = false
                }
            }
        })
    }
    private generate = () => {
        this.isRunning = true
        let data = Array.from({ length: ROW ** 2 }, () => false)
        while(1) {
            const count = countBlackTiles(data)
            if (count > 35 && count < 50) {
                break
            }
            const num = Math.random() * 64 | 0;
            data = turn(data, num)
            data = turn(data, getFlipX(num))
        }
        this.setState({
            data
        })
    }
    private reset = () => {
        this.isRunning = false
        this.setState({
            data: Array.from({ length: ROW ** 2 }, () => false)
        })
    }
    public render() {
        return (
            <div className='black-white-turn'>
                <div className="ctrl">
                    <h2>黑白迭代</h2>
                    <button onClick={this.reset}>重置</button>
                    <button onClick={this.generate}>生成</button>
                </div>
                <Pane data={this.state.data} onClick={this.clickHandle} />
            </div>
        )
    }
}
