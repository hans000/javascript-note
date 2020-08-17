import React, { Component, useState } from 'react'
import ImageViewer from './H5ImageViewer'

export default function() {
    const [visible, setVisible] = useState(false);
    const [url, setUrl] = useState('');

    const closeHandle = () => {
        setVisible(false)
    }
    const show = (url: string) => {
        setVisible(true)
        setUrl(url)
    }
    return (
        <div>
            <button onClick={() => show('./img/1.jpg')}>show</button>
            <button onClick={() => show('./img/2.jpg')}>show</button>
            <button onClick={() => show('./img/3.jpg')}>show</button>
            <button onClick={() => show('./img/4.jpg')}>show</button>
            <ImageViewer onClose={closeHandle} src={url} visible={visible}/>
            {
                Array.from({ length: 50 }).map((e, i) => {
                    return (
                        <div key={i}>wddddddddddddddddddddddd dwwwwwww dw      wd d wd dijwijdi djwi </div>
                    )
                })
            }
        </div>
    )
}
