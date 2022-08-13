import { Button } from 'antd'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import FormObject, { FormSchema } from './FormObject'


interface IProps {
  schema?: FormSchema[]
  value?: Record<string, any>[]
  onChange?: (value: Record<string, any>) => void
}

const Wrapper = styled.div`
  
`

export default function FormArray(props: IProps) {
  const [data, setData] = useState<any[]>([])

  useEffect(
    () => {
      if (JSON.stringify(props.value) !== JSON.stringify(data)) {
        setData(props.value?.map(item => ({ ...item, uid: randId() })) ?? [])
      }
    },
    [props.value]
  )

  return (
    <Wrapper>
      <div className="ctrl">
        <Button style={{ marginRight: 16 }} onClick={() => {
          const newData = [...data, { uid: randId() }]
          setData(newData)
          props.onChange?.(newData)
        }}>{'添加'}</Button>
        <Button onClick={() => {
          setData([])
          props.onChange?.([])
        }}>{'重置'}</Button>
      </div>
      <div className="cont">
        {
          data.map((item, index) => {
            return (
              <div key={item.uid} style={{ border: '1px solid #eee', margin: '16px 0', padding: 16 }}>
                <div style={{ textAlign: 'right' }}>
                  <Button style={{ transform: 'rotate(90deg)', fontSize: 16, cursor: 'pointer' }} onClick={() => {
                    if (index === 0) {
                      return
                    }
                    const newData = [...data]
                    newData.splice(index - 1, 0, ...newData.splice(index, 1))
                    setData(newData)
                    props.onChange?.(newData)
                  }}></Button>
                  <Button style={{ transform: 'rotate(-90deg)', fontSize: 16, cursor: 'pointer' }} onClick={() => {
                    if (index === data.length - 1) {
                      return
                    }
                    const newData = [...data]
                    newData.splice(index + 1, 0, ...newData.splice(index, 1))
                    setData(newData)
                    props.onChange?.(newData)
                  }}></Button>
                  <Button style={{ fontSize: 16, cursor: 'pointer' }} onClick={() => {
                    const newData = [...data]
                    newData.splice(index, 1)
                    setData(newData)
                    props.onChange?.(newData)
                  }}></Button>
                </div>
                <FormObject schema={props.schema ?? []} value={item} onChange={(value) => {
                  const newData = [...data]
                  newData[index] = { ...newData[index], ...value }
                  setData(newData)
                  props.onChange?.(newData)
                }}></FormObject>
              </div>
            )
          })
        }
      </div>
    </Wrapper>
  )
}

function randId() {
    return Math.random().toString(36).slice(2)
}
