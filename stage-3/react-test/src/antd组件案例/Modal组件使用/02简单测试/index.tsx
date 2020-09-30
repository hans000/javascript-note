import { Modal } from 'antd'
import React, { useEffect, useRef, useState } from 'react'

interface IProps {
    children?: React.ReactNode;
}

interface IConfig {
    onOk?: () => boolean;
    onCancel?: () => boolean;
    render?: () => React.ReactNode;
}

SimpleModal.setup = (config?: IConfig): any => {};

export default function SimpleModal(props: IProps) {
    const [visible, setVisible] = useState(false);
    const instRef = useRef<IConfig>(null)

    useEffect(() => {
        SimpleModal.setup = (config: IConfig = {}) => {
            console.log(1);
            instRef.current = config
            setVisible(true)
            // SimpleModal.setup = () => {
            //     setVisible(true)
            // }
        }
    }, [])

    const okHandle = () => {
        let flag = false
        if (instRef.current.onOk) {
            flag = instRef.current.onOk()
        }
        !flag && setVisible(false)
    }
    const cancelHandle = () => { 
        let flag = false
        if (instRef.current.onCancel) {
            flag = instRef.current.onCancel()
        }
        !flag && setVisible(false)
    }
    return (
        <Modal
            afterClose={cancelHandle}
            onOk={okHandle}
            onCancel={cancelHandle}
            visible={visible}>
            {props.children}
            {visible && instRef.current.render && instRef.current.render()}
        </Modal>
    )
}
