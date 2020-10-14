import { Modal } from 'antd'
import React, { useEffect, useRef, useState } from 'react'

interface IProps {
    children?: React.ReactNode;
}

interface IConfig {
    onOk?: () => boolean;
    onCancel?: () => boolean;
    render?: () => React.ReactNode;
    id?: string;
}

SimpleModal.setup = (config?: IConfig): any => {};
SimpleModal.store = {} as any;

export default function SimpleModal(props: IProps) {
    const isFirst = useRef(true)
    const [visible, setVisible] = useState(false);
    const instRef = useRef<IConfig>(null);

    useEffect(() => {
        SimpleModal.setup = (config: IConfig = {}) => {
            instRef.current = config
            setVisible(true)
            isFirst.current = false
            // SimpleModal.setup = () => {
            //     setVisible(true)
            // }
            if (config.id) {
                SimpleModal.store[config.id] = () => setVisible(true)
                return config.id
            }
            const id = Math.random().toString(36).slice(2)
            SimpleModal.store[id] = () => setVisible(true)
            return id
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
