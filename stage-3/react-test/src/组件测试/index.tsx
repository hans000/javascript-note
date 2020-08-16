import React, { useRef } from 'react'
import HsForm from '../components/HsForm'
import { IField, FormType } from '../components/HsForm/HsForm'
import { Button } from 'antd'

export default () => {
    let ref = useRef<any>()
    const data: IField[] = [
        {
            key: 'foo',
            type: FormType.Input,
            validatorConfig: {
                label: 'foo测试'
            }
        }
    ]
    function clickHandle() {
        console.log(ref.current);
    }
    return (
        <div>
            <Button onClick={clickHandle}>click</Button>
            <HsForm data={data} wrappedComponentRef={ref} />
        </div>
    )
}
