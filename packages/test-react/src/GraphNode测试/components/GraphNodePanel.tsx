import styled from "styled-components"
import Draggable from "react-draggable"
import Tile from "./Tile"
import { SpriteProps } from "../core/model"

const Wrapper = styled.div`
    section {
        width: 200px;
        min-height: 150px;
        border-radius: 6px;
        box-shadow: 0 0 5px #ddd;
        background-color: #fff;
        .header {
            height: 30px;
            border-radius: 6px 6px 0 0;
            background-color: #d8d8d8;
            cursor: move;
            user-select: none;
        }
    }
`

const config = [
    { key: 'input1', type: 'input', },
    { key: 'input2', type: 'input', },
    { key: 'output', type: 'output', },
]

export default function GraphNodePanel(props: {
    spriteProps: SpriteProps
    onLink: (props: {
        key: string
        type: 'input' | 'output'
        id: string
    }) => void
}) {
    return (
        <Wrapper>
            <Draggable handle=".header">
                <section>
                    <div className="header"></div>
                    <div className="content">
                        {
                            config.map(item => {
                                return (
                                    <Tile onLink={(type) => {
                                        props.onLink({
                                            key: item.key,
                                            type,
                                            id: props.spriteProps.id,
                                        })
                                    }} key={item.key} type={item.type as any}>
                                        {item.type}
                                    </Tile>
                                )
                            })
                        }
                    </div>
                </section>
            </Draggable>
        </Wrapper>
    )
}