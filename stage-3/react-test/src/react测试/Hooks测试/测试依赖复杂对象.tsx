import React, { useReducer, useCallback } from "react";
import { Input, Button } from "antd";

interface IState {
    name: string
    number: string
}

const initialState: IState = {
    name: 'Tom',
    number: '18888888888',
}
interface IAction {
    type: string
    payload?: any
}
export default function() {
    const [state, dispatch] = useReducer(
        (state: IState, action: IAction) => {
            if (action.type === 'setName') {
                return { ... state, name: action.payload }
            }
            if (action.type === 'setNumber') {
                return { ... state, number: action.payload }
            }
            return state
        },
        initialState
    )

    const clickHandle = useCallback(
        () => {
            console.log(state);
        },
        [state]
    )

    const nameChange = () => (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: 'setName',
            payload: event.target.value
        })
    }

    const numberChange = () => (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: 'setNumber',
            payload: event.target.value
        })
    }
    return (
        <div>
            <Input onChange={nameChange()} value={state.name}/>
            <Input onChange={numberChange()} value={state.number}/>
            <Button onClick={clickHandle}>click me</Button>
        </div>
    )
}