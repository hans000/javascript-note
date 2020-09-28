import React, { Component, useEffect, useState } from 'react'
import { Input, Button } from 'antd'

interface IProps {
    form: any;
    data?: any[];
}
function WrapList(props: IProps) {
    const [data, setData] = useState([])
    const [key, setKey] = useState([])
    useEffect(() => {
        setData(() => props.data || [])
    }, [])
    const addHandle = () => {
        setData(data => [...data, ''])
        setKey(key => [...key, Math.random().toString(36).slice(2)])
    }
    const removeHandle = (index: number) => () => {
        setKey(key => {
            const result = [...key]
            result.splice(index, 1)
            return result
        })
        setData(data => {
            const result = [...data]
            result.splice(index, 1)
            return result
        })
    }
    const itemChange = (index: number) => (e: any) => {
        e.persist()
        setData(data => {
            const result = [...data]
            result.splice(index, 1, e.target.value)
            return result
        })
    }
    const submitHandle = () => {
        console.log(data);
    }
    return (
        <div>
            <Button onClick={addHandle}>add</Button>
            <Button onClick={submitHandle}>submit</Button>
            {
                data.map((item: any, index: number) => {
                    return (
                        <div key={key[index]} className={key[index]}>
                            {
                                React.createElement(props.form, {
                                    value: item,
                                    onChange: itemChange(index)
                                })
                            }
                            <Button onClick={removeHandle(index)}>remove</Button>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default class index extends Component {
    render() {
        return (
            <div>
                <WrapList form={Input}/>
            </div>
        )
    }
}
