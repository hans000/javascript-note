
import React from 'react'

/**
 * 测试render中派生数据导致组件重复渲染
 */

interface IState {
    data: number[];
    key: string;
}
export default class Parent extends React.Component<{}, IState> {
    public state: IState = {
        data: [3, 1, 6, 7, 3, 8, 2, 9],
        key: 'test',
    }
    private add = () => {
        this.setState({
            data: [...this.state.data, 100]
        })
    }
    private updateParent = () => {
        this.setState({
            key: '1' + this.state.key,
        })
    }
    private updateData = () => {
        this.setState({

        })
    }
    public render() {
        const data = this.state.data
        console.log('父组件更新', this.state.data);
        return (
            <div key={this.state.key}>
                <button onClick={this.updateParent}>更新父组件state</button>
                <button onClick={this.updateData}>通过数据更新父组件</button>
                <button onClick={this.add}>更新data</button>
                <div></div>
                <Child data={data} />
            </div>
        )
    }
}

interface IChildProps {
    data: number[];
}
export class Child extends React.Component<IChildProps> {
    shouldComponentUpdate(nextProps: IChildProps) {
        return nextProps.data.toString() !== this.props.data.toString()
    }
    render() {
        console.log('子组件更新', this.props.data);
        return (
            <ul>
                {
                    this.props.data.map((v, i) => <li key={i}>{v}</li>)
                }
            </ul>
        )
    }
}
