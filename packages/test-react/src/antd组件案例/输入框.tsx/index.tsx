import { Input, Tree } from "antd";
import { InputProps } from "antd/lib/input";
import React from "react";

interface IProps extends InputProps {

}
function HsInput(props: IProps) {
    return (
        <Tree checkStrictly treeData={[{ key: '1', title: '1', children: [{ key: '1-1', title: '1-1', children: [] }] }, ]} />
    )
    // return <Input.Search enterButton disabled title={props.value as string} {...props}/>
}


export default function() {
    return (
        <div>
            <HsInput value='wertyuiop[' />
        </div>
    )
}