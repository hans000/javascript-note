import { Modal } from 'antd'
import { ModalProps } from 'antd/lib/modal';
import React, { useImperativeHandle, useState } from 'react'

export interface IPayload {
    show: () => void;
}
interface IProps extends Omit<ModalProps, 'visible'> {
    children?: React.ReactNode
}
export default React.forwardRef<IPayload, IProps>((props, ref) => {
    const [visible, setVisible] = useState(false);

    useImperativeHandle(
        ref,
        () => ({
            show: () => setVisible(true)
        }),
        [],
    )
    const closeHandle = (handle?: any) => () => {
        let flag = false
        if (handle) {
            flag = handle()
        }
        !flag && setVisible(false)
    }
    const { children, afterClose, onCancel, onOk, ...rest } = props
    return (
        <Modal
            afterClose={closeHandle(afterClose)}
            onOk={closeHandle(onOk)}
            onCancel={closeHandle(onCancel)}
            visible={visible}
            {...rest}>
            {children}
        </Modal>
    )
})