import { Spin } from "antd"
import { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { GridView } from "../components/gridview"
import MultiText from "../components/multi-text"
import Page from "../shared/components/Page"


const Wrapper = styled(Page)`
    margin-top: 50px;

    .container {
        background-color: #eee;
        height: 400px;
        overflow-y: auto;
        border: 1px solid #eee;
    }
    .trigger {
        text-align: center;
    }
    .item {
        padding: 16px;
        font-size: 24px;
        text-align: center;
        &:nth-child(odd) {
            background-color: #fff;
        }
    }
`



function fetchData(start = 0) {
    return new Promise<number[]>(resolve => {
        setTimeout(() => {
            resolve(Array.from({ length: 10 }, (_, index) => start + index))
        }, 2000);
    })
}

export default function InfiniteScroll() {
    const containerRef = useRef<HTMLDivElement>(null)
    const triggerBottomRef = useRef<HTMLDivElement>(null)
    const [data, setData] = useState<number[]>([])
    const [loading, setLoading] = useState(false)
    const startRef = useRef(0)

    useEffect(
        () => {
            const triggerNode = triggerBottomRef.current!
            const observer = new IntersectionObserver(([{ intersectionRatio }]) => {
                if (intersectionRatio <= 0) {
                    return
                }
                setLoading(true)
                fetchData(startRef.current).then(res => {
                    setData((data) => {
                        const result = [...data, ...res]
                        startRef.current = result.length
                        return result
                    })
                    setLoading(false)
                })
            }, {
                root: containerRef.current
            })
            observer.observe(triggerNode)
            
            return () => {
              observer.unobserve(triggerNode)
            }
        },
        []
    )

    return (
        <Wrapper>
            <Spin spinning={loading}>
                <div ref={containerRef} className="container">
                    {
                        data.map(num => {
                            return (
                                <div className="item" key={num}>{num}</div>
                                )
                            })
                    }
                    <div ref={triggerBottomRef} className="trigger"></div>
                </div>
            </Spin>
        </Wrapper>
    )
}