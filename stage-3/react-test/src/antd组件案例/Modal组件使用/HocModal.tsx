import React, { useEffect, useRef, useState } from "react";
import { Modal } from "antd";
import { ModalProps } from "antd/lib/modal";

interface IProps extends Omit<ModalProps, 'visible'> {
    children?: React.ReactNode;
}
interface IHandle { }

interface IModalHandle {
    show?: () => void;
    hidden?: () => void;
}

HocModal.setup = (_handle: IHandle): IModalHandle => ({})

export default function HocModal(props: IProps) {
    const instRef = useRef({})
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        HocModal.setup = (handle) => {
            setVisible(true)
            instRef.current = handle
            return {
                show: () => setVisible(true),
                hidden: () => setVisible(false),
            }
        }
    }, [])

    const onCancel = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        setVisible(false)
        if (props.onCancel) {
            props.onCancel(e)
        }
    }
    const onOk = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        setVisible(false)
        if (props.onOk) {
            props.onOk(e)
        }
    }
    return (
        <Modal visible={visible} onCancel={onCancel} onOk={onOk}>
            { props.children }
        </Modal>
    )
}

// interface IProps extends Omit<ModalProps, 'visible'> {

// }

// export default function HocModal(props: IProps) {




//     return (modalProps: { children?: React.ReactNode }) => (
//         <Modal visible={visible} onOk={onOk} onCancel={onCancel} {...rest}>
//             { modalProps.children }
//         </Modal>
//     )
// }

// const Modal = HocModal({

// })