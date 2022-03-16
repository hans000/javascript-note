import React from "react"

interface IProps {
    children: (props: any) => React.ReactElement
    className?: string
    style?: React.CSSProperties
    [key: string]: any
}

export default function WrapField(props: IProps) {
    const { children, className, style, ...restProps } = props
    
    return (
        <span style={style} className={className}>
            {children(restProps)}
        </span>
    )
}