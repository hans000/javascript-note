import { Button, Input } from "antd"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import styled from "styled-components"
import Page from "../shared/components/Page"
import { useSessionStorageState } from "ahooks"
import SyncSession from 'sync-session'

const Wrapper = styled(Page)`
    margin-top: 50px;
    font-size: 16px;
    .header {
        margin-bottom: 16px;
    }
    ul {
        list-style: none;
        li {
            margin-bottom: 16px;
            .highlight {
                color: orange;
            }
        }
    }
`

SyncSession.config.id = 'foo'
SyncSession.config.keys = ['__value__']

export default function MultiPagesStateSync(props: {

}) {
    const location = useLocation()
    const [value, setValue] = useSessionStorageState('__value__', {
        defaultValue: '',
        serializer: v => v,
    })
    
    useEffect(() => {
        SyncSession.pull().then(({ addObject }) => {
            setValue(addObject.__value__)
        })
        SyncSession.subscribe((res) => {
            setValue(res.__value__)
        })
        return () => {
            SyncSession.unsubscribe()
        }
    }, [])
    

    return (
        <Wrapper>
            <div style={{ marginBottom: 16 }}>
                <Button onClick={() => {
                    open('#' + location.pathname)
                }}>新开一个页面</Button>
            </div>

            <Input placeholder="请输入" value={value} onChange={(e) => {
                setValue(e.target.value)
                SyncSession.push()
            }}/>
        </Wrapper>
    )
}