import { useEffect, useState } from 'react'
import Markdown from 'react-markdown'
import remarkGFM from 'remark-gfm'
import styled from 'styled-components'

const Wrapper = styled.div`
    display: flex;
    .left, .right {
        flex: 0 0 50%;
        min-width: 0;
    }
`

export default function MarkdownText() {
    const [rawtext, setRawtext] = useState('')

    return (
        <Wrapper>
            <div className="left">
            <Markdown remarkPlugins={[remarkGFM, function() {
                const data = this.data()
                console.log(data)
            }]}>
                {rawtext}
            </Markdown>
            </div>
            <div className="right">
                <textarea rows={30} cols={100} value={rawtext} onChange={(e) => {
                    setRawtext(e.target.value)
                }}></textarea>
            </div>
        </Wrapper>
    )
}