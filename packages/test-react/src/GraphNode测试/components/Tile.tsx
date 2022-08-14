import { useMemo } from "react"
import styled from "styled-components"
import { clsx } from "../../utils"
import Dot from "./Dot"

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    height: 32px;
    &.input {
        .dot {
            margin-left: -4px;
        }
    }
    &.output {
        text-align: right;
        .dot {
            margin-right: -4px;
        }
    }
    .content {
        width: 100%;
        padding: 0 8px;
    }
`

export default function Tile(props: {
    type: 'input' | 'output'
    children: React.ReactNode
    onLink: (type: 'input'| 'output') => void
}) {

    const isLeft = useMemo(() => props.type === 'input', [props.type])

    return (
        <Wrapper className={clsx({ [props.type]: true })}>
            { isLeft && <Dot onClick={() => {
                props.onLink('input')
            }} className="dot" /> }
            <div className="content">{props.children}</div>
            { !isLeft && <Dot onClick={() => {
                props.onLink('output')
            }} className="dot" /> }
        </Wrapper>
    )
}