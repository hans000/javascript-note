import { Button, Col, Input, InputNumber, Row, Select } from "antd"
import { useEffect, useState } from "react"
import styled from "styled-components"
import GraphNodePanel from "./components/GraphNodePanel"
import { Scene, SpriteProps } from "./core/model"
import { analysis } from "./core/xnode"
import Interpolation from "./core/xnode/InterpolationNode"
import { OperationNode } from "./core/xnode/OperationNode"

const Wrapper = styled.div`
    width: 400px;
    margin: 50px auto;
`

Scene.registXNode(OperationNode)
Scene.registXNode(Interpolation)
const scene = new Scene()

export default function GraphNodeTest() {

    const [schema, setSchema] = useState(analysis(OperationNode))
    const [result, setResult] = useState(0)
    const [type, setType] = useState('')
    const [data, setData] = useState<SpriteProps[]>([])

    return (
        <Wrapper>
            <Select value={type} onChange={setType} style={{ width: 150 }}>
                {
                    Scene.getXNodeTypes().map(type => {
                        return <Select.Option key={type}>{type}</Select.Option>
                    })
                }
            </Select>
            <Button onClick={() => {
                scene.add(type)
                setData(scene.toJson())
            }}>添加</Button>
            {
                data.map((item) => {
                    return (
                        <GraphNodePanel onLink={(props) => {
                            console.log(props)
                        }} spriteProps={item} key={item.id} />
                    )
                })
            }
            {/* <div>
                <svg>
                    <path d={'M 0 0 C50 0 50 100 100 100 l-1 0 l-5 -5 m5 5 l-5 5'} strokeWidth={2} stroke="red" fill="transparent" />
                </svg>
            </div> */}
            {/* <GraphNodePanel /> */}
            {/* {
                schema.input.map(item => {
                    return (
                        <Row key={item.key}>
                            <Col style={{ textAlign: 'right', paddingRight: 16, lineHeight: '32px' }} span={6}>
                                <span title={item.description}>{item.key}</span>
                            </Col>
                            <Col span={18}>
                                <InputNumber onChange={(value) => {
                                    // @ts-ignore
                                    operationNode[item.key] = value as number
                                    setResult(operationNode.getValue())
                                }} style={{ marginBottom: 16, width: '100%' }} placeholder={item.name} />
                            </Col>
                        </Row>
                    )
                })
            } */}
            {/* {
                schema.enumerate.map(item => {
                    return (
                        <Row key={item.key}>
                            <Col style={{ textAlign: 'right', paddingRight: 16, lineHeight: '32px' }} span={6}>
                                <span title={item.description}>{item.key}</span>
                            </Col>
                            <Col span={18}>
                                <Select onChange={(e) => {
                                    operationNode.type = e
                                    console.log(operationNode);
                                    
                                    setResult(operationNode.getValue())
                                }} style={{ width: '100%', marginBottom: 16 }}>
                                    {
                                        item.enums!.map(el => {
                                            return <Select.Option key={el}>{el}</Select.Option>
                                        })
                                    }
                                </Select>
                            </Col>
                        </Row>
                    )
                })
            } */}
            {/* <Row>
                <Col style={{ textAlign: 'right', paddingRight: 16 }} span={6}>结果</Col>
                <Col span={18}>
                    <span>{result}</span>
                </Col>
            </Row> */}
        </Wrapper>
    )
}