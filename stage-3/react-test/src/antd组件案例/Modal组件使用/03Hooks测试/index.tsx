import { Modal } from "antd";
import { useState } from "react";
import React from "react";
import { ModalProps } from "antd/lib/modal";

interface IModalHandle {
    show?: () => void;
    hidden?: () => void;
}

interface IProps extends Omit<ModalProps, 'visible'> {
    onCancel?: () => void;
    onOk?: () => void;
}

type ModalType = [React.FC, IModalHandle]

export default function useModal(props: IProps = {}): ModalType {
    const [visible, setVisible] = useState(false)

    const show = () => setVisible(true)
    const hidden = () => setVisible(false)
    const onOk = () => {
        hidden()
        props.onOk && props.onOk()
    }
    const onCancel = () => {
        hidden()
        props.onCancel && props.onCancel()
    }
    const { onOk: onSubmit, onCancel: onClose, ...rest } = props
    const modal = (modalProps: { children?: React.ReactNode }) => (
        <Modal visible={visible} onOk={onOk} onCancel={onCancel} {...rest}>
            { modalProps.children }
        </Modal>
    )
    return [modal, { show, hidden }]
}