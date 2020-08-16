import React, { useState, useCallback, useMemo } from "react";

interface TestProps {
    foo: number[];
    bar: string;
}
function factory(count: number = 3): TestProps {
    return {
        foo: Array.from({ length: count }, (_, i) => i),
        bar: 'a'.repeat(count),
    }
}

// export default function Test() {
//     const [store, setStore] = useState<IState>(factory())
//     const [count, setCount] = useState(0)
//     function update() {
//         setCount(count => count + 1)
//         setStore(() => factory(count))
//     }
//     return (
//         <div>
//             <button onClick={update}>update</button>
//             <p>{store.foo}</p>
//             <span>{store.bar}</span>
//         </div>
//     )
// }
interface IState {
    store: TestProps;
    count: number;
}
function Foo(props: any) {
    console.log(props.children);
    
    return (
        <div>{props.children}</div>
    )
}

export default function() {
    const [store, setStore] = useState({ foo: [1], bar: '1' })

    const update = useCallback(() => {
        setStore(({ bar }) => {
            return {
                foo: [1],
                bar: bar,
            }
        })
    }, [])
    // const A = useMemo(() => Foo, [store.bar])
    return (
        <div>
            <button onClick={update}>update</button>
            {/* <Foo key='a'>{store.foo}</Foo> */}
            {
                useMemo(() => <Foo key='b'>{store.bar}</Foo>, [store.bar])
            }
            {/* <A>{store.bar}</A> */}
        </div>
    )
}

class Test extends React.Component<{}, IState> {
    public state: IState = {
        store: {
            foo: [1],
            bar: '1',
        },
        count: 1,
    }
    private update = () => {
        this.setState(() => {
            return {
                count: this.state.count + 1,
                store: {
                    foo: [1],
                    bar: '1'.repeat(this.state.count)
                }
            }
        })
    }
    // public shouldComponentUpdate(nextProps: {}, nextState: IState) {
    //     if (nextState.count !== this.state.count) {
    //         return true
    //     }
    //     return false
    // }
    render() {
        return (
            <div>
                <div>
                    <button onClick={this.update}>update</button>
                    <Foo key='a'>{this.state.store.foo}</Foo>
                    <Foo key='b'>{this.state.store.bar}</Foo>
                </div>
                <p>{this.state.count}</p>
            </div>
        )
    }
}
