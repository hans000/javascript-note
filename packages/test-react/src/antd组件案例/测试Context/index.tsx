import React, { useContext, useReducer, useState } from "react";

const TestContext = React.createContext([])


export function Child() {
    const [store, dispatch] = useContext(TestContext)
    return (
        <div>{store.name}</div>
    )
}
interface IState {
    name: string;
}
interface IAction {
    type: string;
    payload: any;
}
function reducer(state: IState, action: IAction) {
    return state
}

function Test() {
    const [store, dispatch] = useReducer(reducer, { name: 'Tom'})

    return (
        <TestContext.Provider value={[store, dispatch]}>
            <Child />
        </TestContext.Provider>
    )
}

function Test2() {
    const [store, dispatch] = useContext(TestContext)
    return (
        <TestContext.Provider value={[store, dispatch]}>
            <Child />
        </TestContext.Provider>
    )
}

export default () => {
    const [active, setActive] = useState(0)
    return (
        active ? <Test /> : <Test2 />
    )
}