import styled from "styled-components"
import ScrollContainer from "../components/scroll-container"
import Page from "../shared/components/Page"


const Wrapper = styled(Page)`
    margin-top: 50px;

    ul {
        display: flex;
        margin: 0;
    }
    li {
        min-width: 0;
        padding: 8px 0;
        flex: 0 0 150px;
        text-align: center;
        background-color: #eee;
        &:nth-child(odd) {
            background-color: #ffa2a2;
        }
    }

`


export default function ScrollContainerPage() {
    return (
        <Wrapper>
            <ScrollContainer style={{ marginBottom: 16 }}>
                <ul>
                    {
                        Array.from({ length: 10 }).map((_, i) => {
                            return (
                                <li key={i}>{i}</li>
                            )
                        })
                    }
                </ul>
            </ScrollContainer>
            <ScrollContainer>
                <ul>
                    {
                        Array.from({ length: 4 }).map((_, i) => {
                            return (
                                <li key={i}>{i}</li>
                            )
                        })
                    }
                </ul>
            </ScrollContainer>
        </Wrapper>
    )
}