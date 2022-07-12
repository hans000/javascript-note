import { Button } from 'antd'
import React, { Component } from 'react'
import './index.css'
import withNormal from './withNormal'

interface IEditProps {
    sidebar?: React.ReactNode;
    renderBtn?: (btns: React.ReactNode[]) => React.ReactNode[];
    onSaveHandle?: () => void;
    onCancelHandle?: () => void;

    foo?: string;
}
interface IState {
    formState: string;
}
class Edit extends Component<IEditProps, IState> {
    public state: IState = {
        formState: 'add'
    }
    private save = () => {
        console.log('发送请求');
        this.setState({
            formState: 'detail'
        })
        if (this.props.onSaveHandle) {
            this.props.onSaveHandle()
        } else {
            console.log('跳转列表页');
        }
    }
    private cancel = () => {
        if (this.props.onCancelHandle) {
            this.props.onCancelHandle()
        } else {
            console.log('跳转列表页');
        }
    }
    private renderBtn = () => {
        const defaultBtns = [
            this.state.formState === 'add' ? <Button key='add' onClick={this.save}>保存</Button> : null,
            <Button key='cancel' onClick={this.cancel}>返回</Button>
        ]
        if (this.props.renderBtn) {
            return this.props.renderBtn(defaultBtns)
        }
        return defaultBtns
    }
    render() {
        return (
            <div>
                <div className="title">
                    {this.renderBtn()}
                </div>
                <div className="cont">
                    <div className="main">
                        表单内容-{this.state.formState}
                    </div>
                    <div className="sidebar">
                        {this.props.foo}
                        { this.props.sidebar }
                    </div>
                </div>
            </div>
        )
    }
}

const NormalEdit = withNormal()(Edit)

export default class index extends Component<{}, { state: boolean }> {
    constructor(props: {}) {
        super(props)
        this.state = {
            state: true
        }
    }
    render() {
        return (
            <div>
                <Edit foo='w' />

                <br />
                
                <NormalEdit />
            </div>
        )
    }
}


