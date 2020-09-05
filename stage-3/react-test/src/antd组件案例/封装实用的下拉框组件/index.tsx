import React, { Component } from 'react'
import HsSelect from './HsSelect'
import { Select } from 'antd'

const options = [
    { title: 'HsSelect', value: 'HsSelect' },
    { title: '2', value: '2' },
    { title: '3', value: '3' },
    { title: '4', value: '4' },
    { title: '5', value: '5' },
    { title: '6', value: '6' },
    { title: '7', value: '7' },
    { title: '8', value: '8' },
]

export default class index extends Component {
    render() {
        return (
            <div>
                <p></p>
                <div>
                    封装前
                    <Select showSearch allowClear style={{ width: 200 }} notFoundContent='暂无内容' placeholder='请选择' optionFilterProp='children'>
                        {
                            options.map(item => {
                                return (
                                    <Select.Option key={item.value} value={item.value}>{item.title}</Select.Option>
                                )
                            })
                        }
                    </Select>
                </div>

                <div>
                    封装后限制大小3时开启搜索
                    <HsSelect maxCount={3} options={options.slice(0, 2)} />
                    <HsSelect maxCount={3} options={options.slice(0, 3)} />
                    <HsSelect maxCount={3} options={options} />
                </div>
            </div>
        )
    }
}
