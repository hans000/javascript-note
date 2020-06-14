import React, { Component } from 'react'
import Pane from './Pane'
import './index.css'

interface IProps {

}
interface IState {
    data: boolean[]
}

const ROW = 8

export default class BlackWhiteTurn extends Component<IProps, IState> {
    public state: IState = {
        data: Array.from({ length: ROW ** 2 }, () => false)
    }
    private clickHandle = (index: number) => {
        this.findUpdateNodes(index)
    }
    private findUpdateNodes = (index: number) => {
        const data = [...this.state.data]
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
        this.setState({
            data
        })
    }
    private reset = () => {
        this.setState({
            data: Array.from({ length: ROW ** 2 }, () => false)
        })
    }
    public render() {
        return (
            <div className='black-white-turn'>
                <div className="ctrl">
                    <button onClick={this.reset}>重置</button>
                </div>
                <Pane data={this.state.data} onClick={this.clickHandle} />
            </div>
        )
    }
}
