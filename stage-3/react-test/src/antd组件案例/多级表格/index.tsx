import { Table } from 'antd'
import React, { Component } from 'react'

const columns: any = [
    {
        // title: '3',
        dataIndex: '3',
        width: 150,
        key: '3',
        children: [
            {
                title: '3',
                dataIndex: '3',
                width: 150,
                key: '3',
                children: [
                    {
                        title: '3-1',
                        dataIndex: '3-1',
                        width: 150,
                        key: '3-1',
                        children: null
                    },
                    {
                        title: '3-2',
                        dataIndex: '3-2',
                        width: 150,
                        key: '3-2',
                        children: null
                    },
                ]
            }
        ]
    },
    {
        title: '4',
        dataIndex: '4',
        width: 150,
        key: '4'
    },
    {
        title: '5',
        dataIndex: '5',
        width: 150,
        key: '5',
        rowSpan: 2,
        children: [
            {
                title: '5-1',
                dataIndex: '5-1',
                width: 150,
                key: '5-1'
            },
            {
                title: '5-2',
                dataIndex: '5-2',
                width: 150,
                key: '5-2'
            },
        ]
    },
]
export default class index extends Component {
    render() {
        return (
            <div>
                <Table dataSource={[{
                    '3-1': 1,
                    '3-2': 2,
                    '4': 3,
                    '5-1': 4,
                    '5-2': 5,
                }]} bordered columns={columns}/>
            </div>
        )
    }
}
