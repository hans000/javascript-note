import { Input } from "antd";
import { InputProps } from "antd/lib/input";
import React from "react";

interface IProps extends InputProps {

}
function HsInput(props: IProps) {
    return <Input title={props.value as string} {...props}/>
}


export default function() {
    return (
        <div>
            <HsInput value='wertyuiop[' />
        </div>
    )
}