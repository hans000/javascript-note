import React, { Component } from 'react'
import Pane from './Pane'
import './index.css'

interface IProps { }
interface IState {
    data: boolean[],
    coordinate: number[][],
}

const ROW = 8

function turn(sourceData: boolean[], index: number) {
    const data = [...sourceData]
    const offset = [0, 0, -1, 0, 0, 1, 1, 0, 0, -1]
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
export function convert(index: number) {
    return [index / ROW | 0, index % ROW]
}
function getFlipX(index: number) {
    const [row, col] = convert(index)
    return ROW * row + 7 - col
}
function countBlackTiles(data: boolean[]) {
    return data.reduce((s, v) => v ? s + 1 : s, 0)
}
function filter(path: number[]) {
    path = path.sort((a, b) => a - b)
    return path.reduce((s, v) => {
        if (s[s.length - 1] === v) {
            s.pop()
        } else {
            s.push(v)
        }
        return s
    }, [])
}
export default class BlackWhiteTurn extends Component<IProps, IState> {
    private isRunning = false;
    private path: number[] = []

    public state: IState = {
        data: Array.from({ length: ROW ** 2 }, () => false),
        coordinate: [],
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
        this.path = []
        while(1) {
            const count = countBlackTiles(data)
            if (count > 35 && count < 50) {
                break
            }
            const num = Math.random() * 64 | 0;
            data = turn(data, num)
            const num2 = getFlipX(num)
            data = turn(data, num2)
            this.path.push(num, num2)
        }
        this.setState({
            data,
            coordinate: [],
        })
    }
    private reset = () => {
        this.isRunning = true
        let initData = Array.from({ length: ROW ** 2 }, () => false)
        const data = this.path.reduce((s, v) => {
            s = turn(s, v)
            return s
        }, initData)
        this.setState({
            data
        })
    }
    private clear = () => {
        this.isRunning = false
        this.setState({
            data: Array.from({ length: ROW ** 2 }, () => false),
            coordinate: [],
        })
    }
    private cheat = () => {
        const path = filter(this.path)
        console.log(path);
        
        this.setState({
            coordinate: path.map(v => convert(v))
        })
    }
    public render() {
        return (
            <div className='black-white-turn'>
                <div className="ctrl">
                    <h2>黑白迭代</h2>
                    <button onClick={this.generate}>生成</button>
                    <button onClick={this.clear}>清空</button>
                    <button onClick={this.reset}>恢复</button>
                    <button onClick={this.cheat}>提示</button>
                </div>
                <Pane data={this.state.data} onClick={this.clickHandle} />
                <div className="tips">
                    {
                        this.state.coordinate.map((arr, index) => {
                            return <span key={index} style={{ padding: '10px' }}>{`(${arr[0]}, ${arr[1]})`}</span>
                        })
                    }
                </div>
            </div>
        )
    }
}
