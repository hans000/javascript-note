import { Input } from 'antd'
import React from 'react'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import FormArray from './FormArray'


export interface FormSchema {
  key: string
  type: 'input' | 'form-array' | 'form-object' | 'upload'
  label: string
  [key: string]: any
}

interface IProps {
  schema?: FormSchema[]
  value?: Record<string, unknown>
  onChange?: (value: any) => void
}

const Wrapper = styled.section`

`

export default function FormObject(props: IProps) {
  const [value, setValue] = useState<Record<string, any>>({})

  useEffect(
    () => {
      if (JSON.stringify(props.value) !== JSON.stringify(value)) {
        setValue(props.value ?? {})
      }
    },
    [props.value]
  )

  const handleUpdate = React.useCallback(
    (key: string, newValue: any) => {
      setValue(val => {
        return {
          ...val,
          [key]: newValue
        }
      })
      props.onChange?.({
        ...value,
        [key]: newValue
      })
    },
    [props.onChange, value]
  )

  return (
    <Wrapper>
      {
        (props.schema || []).map(item => {
          const { key, type, label, ...restProps } = item
          const formValue = value[key]
          return (
            <div key={key}>
              <div style={{ marginBottom: 16 }}>{label} - {key}</div>
              <div style={{ marginBottom: 16 }}>
                {
                  type === 'form-array'
                    ? <FormArray {...restProps} value={formValue ?? []} onChange={(newValue) => handleUpdate(key, newValue)} />
                    : type === 'form-object'
                    ? <FormObject {...restProps} value={formValue ?? {}} onChange={(newValue) => handleUpdate(key, newValue)} />
                    : <Input style={{ width: '100%', height: 32 }} {...restProps} value={formValue ?? ''} onChange={(newValue) => handleUpdate(key, newValue)} /> 
                }
              </div>
            </div>
          )
        })
      }
    </Wrapper>
  )
}