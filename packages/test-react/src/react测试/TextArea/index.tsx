import React, { Component } from 'react'
import TextArea from 'antd/lib/input/TextArea'

export default class index extends Component {
    public state = {
        text: ''
    }
    render() {
        return (
            <div>
                <TextArea onChange={(e) => this.setState({ text: e.target.value })} />
                <pre>{this.state.text}</pre>
            </div>
        )
    }
}
