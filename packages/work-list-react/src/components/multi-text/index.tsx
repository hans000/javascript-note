import styled from "styled-components"

const Wrapper = styled.span<{ lines: number }>`
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: ${props => props.lines};
    -webkit-box-orient: vertical;
`

export default function MultiText(props: {
    children?: string
    lines: number
    style?: React.CSSProperties
    className?: string
}) {
    const { children, lines, ...rest } = props
    return (
        <Wrapper lines={props.lines} {...rest} title={props.children}>
            {props.children}
        </Wrapper>
    )
}