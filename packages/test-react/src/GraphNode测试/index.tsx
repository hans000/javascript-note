import { Col, Input, InputNumber, Row, Select } from "antd"
import { useEffect, useState } from "react"
import styled from "styled-components"
import { analysis } from "./core"
import { OperationNode } from "./core/OperationNode"

const Wrapper = styled.div`
    width: 400px;
    margin: 50px auto;
`

const operationNode = new OperationNode()

export default function GraphNodeTest() {

    const [schema, setSchema] = useState(analysis(OperationNode))
    
    const [result, setResult] = useState(0)

    return (
        <Wrapper>
            {
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
            }
            {
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
            }
            <Row>
                <Col style={{ textAlign: 'right', paddingRight: 16 }} span={6}>结果</Col>
                <Col span={18}>
                    <span>{result}</span>
                </Col>
            </Row>
        </Wrapper>
    )
}