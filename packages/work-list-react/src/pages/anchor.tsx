import { Alert } from "antd"
import styled from "styled-components"
import Sidebar from "../components/anchor/Sidebar"
import Page from "../shared/components/Page"

const Wrapper = styled(Page)`
    margin-top: 32px;
    h2 {
        height: 700px;
        &::before {
            content: '';
            display: block;
            margin-top: -46px;
            height: 46px;
        }
    }
`

export default function AnchorPage(props: {

}) {
    return (
        <Wrapper>
            <Sidebar />
            <h2 id="caption1">章节1</h2>
            <h2 id="caption2">章节2</h2>
            <h2 id="caption3">章节3</h2>
            <h2 id="caption4">章节4</h2>
            <h2 id="caption5">章节5</h2>
        </Wrapper>
    )
}