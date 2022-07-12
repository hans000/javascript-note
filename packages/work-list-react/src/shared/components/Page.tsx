import clsx from "clsx";
import styled from "styled-components";

const Wrapper = styled.div`
    max-width: 960px;
    margin: 0 auto;
`

export default function Page(props: {
    children: React.ReactNode
    style?: React.CSSProperties
    className?: string
}) {
    return (
        <Wrapper style={props.style} className={clsx('page', props.className)}>
            {props.children}
        </Wrapper>
    )
}