import React, { Component } from 'react'

interface IProps {
    // name: string;
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
                {/* {this.props.btnData} */}
            </div>
        )
    }
}
