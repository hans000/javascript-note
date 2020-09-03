import { Select } from "antd"
import React from "react"
import { SelectProps } from "antd/lib/select"

/**
 * 
 */

/** */
interface IProps extends SelectProps {
    options: IOptions[]
    maxCount?: number
}

// 根据项目需求设置默认参数
const defaultProps = {
    maxCount: 30,
    placeholder: '请选择',
    optionFilterProp: 'children'
}

export interface IOptions {
    title: string
    value: string
}

export default function(props: IProps) {
    const { options, maxCount, ...rest } = { ...defaultProps, ...props}
    return (
        <Select showSearch={options.length > maxCount} {...rest}>
            {
                options.map(({ title, value }) => <Select.Option value={value}>{title}</Select.Option>)
            }
        </Select>
    )
}