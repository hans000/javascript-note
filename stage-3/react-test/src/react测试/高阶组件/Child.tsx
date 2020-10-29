import React, { Component } from 'react'

interface IProps {
    name: string;
    age: number;
    btnData: string[];
}
interface IState {
    foo: string
}
export default class Child extends Component<IProps, IState> {
    componentDidMount() {
        // console.log(this.props.btnData);
    }
    render() {
        return (
            <div>
                {this.props.name} - {this.props.age}
            </div>
        )
    }
}
