import React, { Component } from 'react'
import Child from './Child'

interface IProps {
}
interface IState {
    foo: string
}

export default class index extends Component<IProps, IState> {

    private request = () => {
        return new Promise<{ name: string, age: number }>(resolve => {
            setTimeout(() => {
                resolve({
                    name: 'Tom',
                    age: 18
                })
            }, 1000)
        })
    }

    private comp = withSuspense(this.request)(Child)

    render() {
        return (
            <div>
                {
                    React.createElement(this.comp, {
                        btnData: ['1'],
                    })
                }
            </div>
        )
    }
}

type IRequestHandle<H> = () => Promise<H>

function withSuspense<H>(handle: IRequestHandle<H>, spinning?: JSX.Element) {
    return <T extends H>(Com: React.ComponentType<T>): React.ComponentClass<Omit<T, keyof H>> => {
        return class extends Component<Omit<T, keyof H>, { loading: boolean, data: H }> {
            constructor(props: Omit<T, keyof H>) {
                super(props)
                this.state = {
                    loading: true,
                    data: null,
                }
            }

            
            componentDidMount() {
                handle().then((data) => {
                    this.setState({
                        data,
                        loading: false
                    })
                }).catch((e) => {
                    this.setState({
                        loading: false
                    })
                    console.error(e);
                })
            }
            render() {
                return (
                    this.state.loading
                        ? (spinning ? spinning : <div>loading</div>)
                        : <Com {...this.state.data} {...this.props as T} />
                )
            }
        }
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