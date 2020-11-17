import { Button, Tree } from "antd"
import React, { useState } from "react"

export default () => {
    const [keys, setKeys] = useState([])
    const select = (keys: string[]) => {
        setKeys(keys)
    }
    return (
        <div>
            <Tree selectedKeys={keys} onSelect={select} treeData={[{ title: '1', key: '1', children: []}, { title: '2', key: '2', children: []}]} />
            <Button onClick={() => setKeys([])}>reset</Button>
        </div>
    )
}