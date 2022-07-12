import React, { useEffect, useRef, useState } from "react"
import './index.css'
import Line from "./Line"
import PeakTurn from "./logic"
import Tile from "./Tile"
import lz from 'lz-string'
import copy from 'copy-to-clipboard'

// mode: 1 出题，0 做题
export default () => {
    const instRef = useRef(new PeakTurn())
    const [ans, setAns] = useState([])
    const [tiles, setTiles] = useState([])
    const [vlines, setVLines] = useState([])
    const [hlines, setHLines] = useState([])
    const [mode, setMode] = useState(0)

    useEffect(() => {
        document.title = '数回 - by hans0000'
        load()
        update()
    }, [])
    const load = () => {
        try {
            const data = JSON.parse(lz.decompressFromBase64(window.location.hash.slice(1))) || {}
            if (Array.isArray(data)) {
                setAns(() => data)
                setMode(() => 0)
            } else {
                setMode(() => 1)
            }
        } catch (error) {
            alert('参数错误，请确认链接正确性')
        }
    }
    const update = () => {
        const inst = instRef.current
        const clist = inst.getCList()
        setTiles(() => clist)
        setVLines(() => inst.getVList())
        setHLines(() => inst.getHList())
        if (mode === 0 && JSON.stringify(ans) === JSON.stringify(inst.getCList())) {
            alert('恭喜您完成挑战！')
            setMode(() => 1)
        }
    }
    const tileClick = (index: number, mode: string, offset: number) => {
        if (mode === 'vertical') {
            vlineClick(index + offset)
        } else {
            hlineClick(index + offset)
        }
    }
    const hlineClick = (index: number) => {
        instRef.current.toggleHList(index)
        update()
    }
    const vlineClick = (index: number) => {
        instRef.current.toggleVList(index)
        update()
    }
    const share = () => {
        if (!instRef.current.isCircle()) {
            alert('出题存在交叉或没有闭环！')
            return;
        }
        const data = instRef.current.getCList()
        const url = lz.compressToBase64(JSON.stringify(data))
        window.location.hash = url
        copy(window.location.href)
        alert('链接已复制到剪切板')
    }
    const create = () => {
        setMode(() => 1)
        instRef.current.reset()
        setAns(() => [])
        window.location.hash = ''
        update()
    }
    const cls = ['peak-turn--pane']
    if (mode === 1) {
        cls.push('create')
    }
    const redo = () => {
        instRef.current.reset()
        setMode(() => 0)
        update()
    }
    return (
        <div className='peak-turn'>
            <h1>数回</h1>
            <div className={cls.join(' ')}>
                {
                    (mode === 1 ? tiles : ans).map((tile, index) => <Tile scale={PeakTurn.scale} key={'tile' + index} onClick={tileClick} value={tile} index={index}/>)
                }
                {
                    vlines.map((line, index) => <Line value={line} onClick={vlineClick} index={index} scale={PeakTurn.scale + 1} mode='vertical' key={'vline' + index} />)
                }
                {
                    hlines.map((line, index) => <Line value={line} onClick={hlineClick} index={index} scale={PeakTurn.scale} mode='horizontal' key={'hline' + index} />)
                }
            </div>
            <div className='peak-turn--bar'>
                {
                    ans.length
                        ? (
                            <button className='btn' onClick={redo}>重做</button>
                        )
                        : (
                            <button className='btn' onClick={share}>分享</button>
                        )
                }
                <button className='btn' onClick={create}>出题</button>
            </div>
            <ul className='peak-turn--desc'>
                <li>规则：</li>
                <li>数字代表周围涂色的边的<b>个数</b></li>
                <li>涂色的边要求围成<b>一个</b>封闭的区域，且<b>不交叉</b></li>
            </ul>
        </div>
    )
}