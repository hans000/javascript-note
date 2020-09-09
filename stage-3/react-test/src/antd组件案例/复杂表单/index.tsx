import React, { Component, useEffect, useState } from 'react'
import { Input, Button } from 'antd'

interface IProps {
    form: any;
    data?: any[];
}
function WrapList(props: IProps) {
    const [data, setData] = useState([])
    useEffect(() => {
        setData(() => props.data || [])
    }, [])
    const clickHandle = () => {
        setData(data => [...data, ''])
    }
    const removeHandle = (index: number) => () => {
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
            <Button onClick={clickHandle}>add</Button>
            <Button onClick={submitHandle}>submit</Button>
            {
                data.map((item: any, index: number) => {
                    return (
                        <div key={index}>
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
