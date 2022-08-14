import styled from "styled-components"

const Wrapper = styled.div`
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: green;
    cursor: pointer;
    &.active {
        background-color: orange;
    }
    &:hover {
        background-color: orange;
    }
`

export default function Dot(props: {
    className?: string
    style?: React.CSSProperties
    onClick?: () => void
}) {
    return (
        <Wrapper onClick={props.onClick} style={props.style} className={props.className}>
        </Wrapper>
    )
}