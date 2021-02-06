/**
 * 表格单选功能
 * 
 * antd中的Table组件如何设置了rowSelection属性会开启复选框功能
 * 但是在某些情况下我们需要单选，那么如何实现呢？
 * 
 * 思路：通过实现onChange方法，修改selectedRowKeys和selectedRows字段
 * 由于表头的复选框没有属性控制，只能使用样式覆盖的方式display: none; 
 * 
 */

import React, { useState } from 'react'
import { Table, Button, Input } from 'antd'
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
                <Input />
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
                pagination={{}}
                rowKey='name' />
        </div>
    )
}