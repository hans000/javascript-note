import React from "react";
import './index.css'

interface IProps {
    src: string
    visible: boolean
    onClose?: () => void
}
export default function(props: IProps) {
    return (
        props.visible
            ? (
                <div className='img-viewer'>
                    <div className="img-viewer-wrap">
                        <img className='img-viewer-img' src={props.src} alt=""/>
                    </div>
                    <div onClick={props.onClose} className="img-viewer-close">x</div>
                </div>
            )
            : null
    )
}