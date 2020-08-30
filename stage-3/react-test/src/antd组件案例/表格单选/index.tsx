import React, { useState } from 'react'
import { Table, Button } from 'antd'
import './index.css' // 通过覆盖样式的方式吧多选控件隐藏

const columns = [
    { dataIndex: 'name', title: '名字' },
    { dataIndex: 'number', title: '电话' },
]

const data = [
    { name: 'zhang san', number: '12456' },
    { name: 'li si', number: '9875' },
    { name: 'wang wu', number: '2432543' },
    { name: 'zhao liu', number: '3444656' },
]

export default function() {
    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    const [selectedRows, setSelectedRows] = useState([])
    
    const onChange = (keys: string[] | number[], rows: any[]) => {
        // ! 核心代码
        // 更新数据前判断勾选为2时把前一次的勾选从数组中移除
        if (keys.length === 2) {
            const index = selectedRowKeys[0] === keys[0] ? 0 : 1
            rows.splice(index, 1)
            keys.splice(index, 1)
        }
        setSelectedRowKeys(() => keys)
        setSelectedRows(() => rows)
    }

    const clickHandle = () => {
        console.log(selectedRowKeys, selectedRows);
    }

    return (
        <div>
            <div>
                <Button onClick={clickHandle}>click me</Button>
            </div>
            <Table
                className='single-table'
                columns={columns}
                dataSource={data}
                rowSelection={{
                    selectedRowKeys,
                    onChange,
                }}
                rowKey='name' />
        </div>
    )
}