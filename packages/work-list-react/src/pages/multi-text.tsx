import styled from "styled-components"
import { GridView } from "../components/gridview"
import MultiText from "../components/multi-text"
import Page from "../shared/components/Page"


const Wrapper = styled(Page)`
    margin-top: 50px;


`

const text = '江南好，风景旧曾谙。日出江花红胜火，春来江水绿如蓝。能不忆江南？'
const text2 = 'Having a calm smile to face with being disdained indicates kind of confidence。'

export default function MultiTextPage() {
    return (
        <Wrapper>
            <GridView>
                <MultiText lines={1}>{text}</MultiText>
                <MultiText lines={2}>{text}</MultiText>
            </GridView>
            <GridView>
                <MultiText lines={1}>{text2}</MultiText>
                <MultiText lines={2}>{text2}</MultiText>
            </GridView>
        </Wrapper>
    )
}