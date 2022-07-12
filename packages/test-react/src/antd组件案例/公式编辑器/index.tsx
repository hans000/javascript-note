import { Input } from 'antd'
import React, { useState, useRef, useEffect, RefObject } from 'react'
import './index.css'
import { intelligence, IToken, ITreeOptions } from './logic'
import MatchExpection from './logic/MatchExpection'
import parse from './logic/parse'
import SyntaxExpection from './logic/SyntaxExpection'

const dataOptions: ITreeOptions = [
    { value: '四舍五入', text: '四舍五入' },
    { value: '取余', text: '取余' },
    { value: '项目1', text: '项目1', children: [{ value: '项目1-1', text: '项目1-1' }] },
    { value: '项目2', text: '项目2', children: [{ value: '项目2-1', text: '项目2-1' }] },
    { value: '项目3', text: '项目3', children: [{ value: '项目3-1', text: '项目3-1' }] },
]

const $ = 'fomula-editor'

export default function() {
    const contRef = useRef<any>()
    const tilesRef = useRef<any>([])
    const textRef = useRef<any>()
    const textareaRef = useRef<HTMLTextAreaElement>()
    const offsetRef = useRef(0)
    const inputRef = useRef<any>();
    const [options, setOptions] = useState(dataOptions)
    const [msg, setMsg] = useState('')
    const [textarea, setTextarea] = useState('')
    const [offsetX, setOffsetX] = useState(0)
    const [value, setValue] = useState<IToken[]>([])
    const tokenRef = useRef<IToken[]>([])
    const [visible, setVisible] = useState(true)
    useEffect(() => {
        textareaRef.current.focus()
    }, [])

    const updateOptions = (tokens: IToken[]) => {
        if (tokens.length) {
            const options = intelligence(tokens[tokens.length - 1].type, dataOptions)
            setOptions(options);
        }
    }
    const check = (value: string) => {
        try {
            const tokens = parse(value)
            tokenRef.current = tokens
            updateOptions(tokens)
            setValue(tokens)
            updateCursor()
            setMsg('')
        } catch (error) {
            if (error instanceof SyntaxExpection) {
                const options = intelligence(error.getToken().type, dataOptions)
                setOptions(options);
                tokenRef.current = error.getTokens()
                setValue(error.getTokens())
                updateCursor()
                setMsg(`${error.toString()}`)
            } else if (error instanceof MatchExpection) {
                const options = intelligence(error.getToken().type, dataOptions)
                setOptions(options);
                tokenRef.current = error.getTokens()
                setValue(error.getTokens())
                updateCursor()
                setMsg(`${error.toString()}`)
            } else {
                console.log(error);
            }
        }
    }
    const updateCursor = () => {
        const range = document.createRange()
        const actToken = getActToken(offsetRef.current)
        const currentNode = tilesRef.current[actToken.index]
        if (currentNode) {
            const left = textareaRef.current.selectionStart - offsetRef.current
            range.setStart(currentNode.firstChild, left)
        }
        offsetRef.current = textareaRef.current.selectionStart
        // tilesRef.current[index] = textRef.current.childNodes[index]
        setOffsetX(range.getBoundingClientRect().x - contRef?.current.getBoundingClientRect().x);
    }
    function click(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        event.persist()
        const rng = getRange()
        // const actToken = getActToken(textareaRef.current.selectionStart)
        // offsetRef.current = textareaRef.current.selectionStart
        // const currentNode = tilesRef.current[actToken.index]
        // console.log(currentNode);
        //@ts-ignore
        console.log(rng.startContainer, event.target.firstChild, rng.startOffset);
        //@ts-ignore
        rng.setStart(event.target.firstChild , rng.startOffset)
        // rng.setStart(rng.startContainer, rng.startOffset)
        // textareaRef.current.setSelectionRange(rng.startOffset, rng.startOffset)
        // offsetRef.current = textareaRef.current.selectionStart
        //@ts-ignore
        const x = event.target.getBoundingClientRect().x - contRef?.current.getBoundingClientRect().x
        // const x = rng.getBoundingClientRect().x - contRef?.current.getBoundingClientRect().x
        setOffsetX(x)
    }
    function getRange() {
        return window.getSelection().getRangeAt(0)
    }
    const contClick = () => {
        textareaRef.current.focus()
    }
    const textareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const result = event.target.value
        setTextarea(result)
        check(result)
    }
    const getActToken = (offset: number) => {
        return tokenRef.current.find(item => item.offset + item.value.length >= offset)
    }
    const textareaKeyUp = () => {
        const range = document.createRange()
        const actToken = getActToken(textareaRef.current.selectionStart)
        offsetRef.current = textareaRef.current.selectionStart
        const currentNode = tilesRef.current[actToken.index]
        if (currentNode) {
            range.setStart(currentNode.firstChild, textareaRef.current.selectionStart - actToken.offset)
            setOffsetX(range.getBoundingClientRect().x - contRef?.current.getBoundingClientRect().x);
        }
    }
    return (
        <div style={{ margin: 32 }}>
            <div className={$}>
                <div></div>
                <div style={{ color: 'red', height: 24 }}>{msg}</div>
                <div className={$ + '__cont'} ref={contRef} onClick={contClick}>
                    <div ref={textRef} className={$ + '__cont-wrap'} onClick={click}>
                        {
                            value.map((item, index) => <span ref={(ref) => tilesRef.current[index] = ref} key={index}>{item.value}</span>)
                        }
                    </div>
                    <textarea
                        style={{ left: offsetX }}
                        onKeyUp={textareaKeyUp}
                        ref={textareaRef}
                        value={textarea}
                        onChange={textareaChange}
                        className={$ + '__input'} />
                    <div style={{ left: offsetX }} className={$ + '__cursor'}></div>
                </div>
                {/* {
                    visible && (
                        <div className={$ + '__wrap'}>
                            {
                                options.map(item => (
                                    <div onClick={selectClick(item)} className={$ + '__item'} key={item.value}>{item.text}</div>
                                ))
                            }
                        </div>
                    )
                } */}
            </div>
        </div>
    )
}