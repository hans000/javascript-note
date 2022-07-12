import { Button, Input, Select, Table } from "antd";
import React from "react";
import useForm from "./useForm";
import useGesture from "./useGesture";
import useTableRequest from "./useTableRequest";

export default function() {
    const [data, { setForm, resetForm }] = useForm({
        searchInput: '',
        searchSelect: '1',
    })
    const reqTable = (params: any) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log({
                    ...data,
                    ...params,
                });
                resolve({
                    beans: [{ name: Math.random().toString(36).slice(2) }],
                    bean: {
                        total: 100
                    }
                })
            }, 1000)
        })
    }
    const { list, loading, pagination, reqTableData } = useTableRequest(reqTable)
    
    useGesture(console.log)

    function submit() {
        reqTableData(data)
    }
    function reset() {
        reqTableData(resetForm())
    }
    return (
        <div>
            <Button onClick={submit}>提交</Button>
            <Button onClick={reset}>重置</Button>
            <Input value={data.searchInput} onChange={e => setForm({ searchInput: e.target.value })} />
            <Select value={data.searchSelect} onChange={(e: any) => setForm({ searchSelect: e})}>
                <Select.Option value='1'>1</Select.Option>
                <Select.Option value='2'>2</Select.Option>
            </Select>
            <Table
                pagination={pagination}
                loading={loading}
                rowKey='name'
                dataSource={list}
                columns={[{dataIndex: 'name',key: 'name', title: 'name'}]}></Table>
        </div>
    )
}