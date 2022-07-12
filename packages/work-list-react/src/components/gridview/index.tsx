import clsx from "clsx"
import React from "react"
import styled from "styled-components"

const WrapperGrid = styled.div<{
    columns: number
    rowGutter: number
    colGutter: number
}>`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .gridview__item {
        min-width: 0;
        box-sizing: border-box;
        flex: 0 0 calc(${props => 100 / props.columns}% - ${props => props.colGutter * (props.columns - 1) / props.columns}px);
        margin-bottom: ${props => props.rowGutter}px;
    
        &.gridview__placeholder {
            height: 0;
            padding: 0;
            margin: 0;
        }
    }
`

export function GridView(props: {
    children: React.ReactNode[];
    rowGutter?: number;
    colGutter?: number;
    columns?: number;
    className?: string;
    style?: React.CSSProperties;
}) {

    const placeholderCount = React.useMemo(
        () => {
            const count = props.columns || 4
            return (count - props.children.length % count) % count
        },
        [props.children, props.columns]
    )

    return (
        <WrapperGrid
            className={clsx('gridview', props.className)}
            colGutter={props.colGutter ?? 24}
            rowGutter={props.rowGutter ?? 24}
            style={props.style}
            columns={props.columns ?? 4}>
            {
                props.children.map((child, index) => {
                    return (
                        <div className="gridview__item" key={index}>{child}</div>
                    )
                })
            }
            {
                Array.from({ length: placeholderCount }).map((_, index) => <i key={index} className='gridview__item gridview__placeholder'></i>)
            }
        </WrapperGrid>
    )
}
