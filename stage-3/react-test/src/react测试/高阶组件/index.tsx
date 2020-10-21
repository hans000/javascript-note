import React, { Component } from 'react'
import Child from './Child'

interface IProps {
}
interface IState {
    foo: string
}

export default class index extends Component<IProps, IState> {

    private comp = withBtn('1234')(Child)

    render() {
        return (
            <div>
                {
                    React.createElement(this.comp)
                }
            </div>
        )
    }
}

function withBtn(id: string) {
    interface IBtnProps {
        btnData: string[]
    }
    return <T extends IBtnProps>(Com: React.ComponentType<T>): React.ComponentClass<T> => {
        return class extends Component<T, IBtnProps> {
            constructor(props: T) {
                super(props)
                this.state = {
                    btnData: [],
                }
            }
            componentDidMount() {
                this.setState({
                    btnData: [id]
                })
            }
            render() {
                return (
                    <Com {...this.state} {...this.props} />
                )
            }
        }
    }
}