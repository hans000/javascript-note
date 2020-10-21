import { Button } from "antd"
import React, { Component } from "react"

interface INormalProps {
    sidebar?: React.ReactNode;
    renderBtn?: (btns: React.ReactNode[]) => React.ReactNode[];
    onSaveHandle?: () => void;
    onCancelHandle?: () => void;
}

export default function withNormal() {
    return <T extends Pick<INormalProps, keyof INormalProps>>(Com: React.ComponentType<T>): React.ComponentType<Omit<T, keyof INormalProps>> => {
        return class extends Component<Omit<T, keyof INormalProps>> {
            render() {
                return (
                    <Com {...this.state} 
                        {...this.props as T}
                        sidebar={'sidebar内容'}
                        onSaveHandle={() => console.log('调转到首页')}
                        onCancelHandle={() => console.log('调转到首页')}
                        renderBtn={(btns) => {
                            return [
                                ...btns,
                                <Button key='3'>审批</Button>,
                                <Button key='4'>提交</Button>
                            ]
                        }}
                        />
                )
            }
        }
    }
}