import React, { Component } from 'react'
import Pane from './Pane'
import './index.css'

interface IProps { }
interface IState {
    data: boolean[]
}

const ROW = 8
const HEIGHT = 6
const COUNT = ROW ** 2
const TOTAL_COUNT = COUNT * HEIGHT

export default class BlackWhiteTurn extends Component<IProps, IState> {

    public state: IState = {
        data: Array.from({ length: TOTAL_COUNT }, () => false)
    }
    private clickHandle = (index: number) => {
        this.findUpdateNodes(index)
    }
    private findUpdateNodes = (index: number) => {
        const data = [...this.state.data]
        // 前右下左上下
        const offset = [0, 0, 0, -1, 0, 0, 0, 1, 0, 1, 0, 0, 0, -1, 0, 0, 0, -1, 0, 0, 1]
        // 查找周围，取反
        for (let i = 0; i < offset.length; i+=3) {
            const oy = offset[i]
            const ox = offset[i + 1]
            const oz = offset[i + 2]
            const newIndex = index + oy * ROW + ox + COUNT * oz
            // 排除非法边界
            if (newIndex < 0 || 
                newIndex >= TOTAL_COUNT) {
                continue
            }
            const zIndex = index / COUNT | 0
            const zNewIndex = newIndex / COUNT | 0
            if (zIndex === zNewIndex) {
                if (index % ROW === 0 && newIndex + 1 === index ||
                    (index + 1) % ROW === 0 && newIndex - 1 === index) {
                    continue
                }
            } else {
                if (index !== newIndex + COUNT && index !== newIndex - COUNT) {
                    continue
                }
            }
            data[newIndex] = !data[newIndex]
        }
        this.setState({
            data
        })
    }
    private reset = () => {
        this.setState({
            data: Array.from({ length: TOTAL_COUNT }, () => false)
        })
    }
    private slice() {
        const data = [...this.state.data]
        const result = []
        const count = ROW ** 2
        while(data.length) {
            result.push(data.splice(0, count))
        }
        return result
    }
    public render() {
        return (
            <div className='either-black-white'>
                <div className="ctrl">
                    <button onClick={this.reset}>重置</button>
                </div>
                {
                    this.slice().map((data, index) => (
                        <Pane key={index} data={data} onClick={(pos) => this.clickHandle(pos + index * COUNT)} />
                    ))
                }
            </div>
        )
    }
}
