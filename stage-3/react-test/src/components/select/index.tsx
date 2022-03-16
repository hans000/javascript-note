/**
 * Copyright 2022 EasyStack, Inc.
 */
import React from 'react'
import styled from 'styled-components'
import ArrowRight from '@assets/images/icons/arrow-right.svg'
import { SvgIcon } from '..'

interface IProps {
  value?: string
  onChange?: (value: string | undefined, record: { label: string; value: string } | undefined) => void
  options: Array<{ label: string; value: string }>
  style?: React.CSSProperties
  placeholder?: string
}

const Wrapper = styled.div`
  position: relative;
  > select {
    width: 100%;
    line-height: 32px;
    color: #2F3B4F;
    outline: none;
    height: 48px;
    border: 1px solid #C5CEDE;
    box-sizing: border-box;
    border-radius: 4px;
    padding: 0 12px;
    appearance: none;
  }
  .svg-icon {
    position: absolute;
    top: 50%;
    right: 12px;
    color: #000;
    font-size: 20px;
    transform: translateY(-50%) rotate(90deg);
    pointer-events: none;
  }
`

const Key = '__placeholder'

export default function Select(props: IProps) {
  const [value, setValue] = React.useState('')
  const [options, setOptions] = React.useState<Array<{ label: string; value: string }>>([])

  React.useEffect(
    () => {
      setValue(props.value ?? '')
    },
    [props.value]
  )

  React.useEffect(
    () => {
      setOptions([{ label: props.placeholder ?? '请选择', value: Key }, ...props.options])
    },
    [props.options]
  )

  return (

    <Wrapper className='es-select' style={props.style}>
      <SvgIcon src={ArrowRight} />
      <select value={value} onChange={(ev) => {
        const option = options[ev.target.selectedIndex]

        setValue(option.value)
        if (option.value === Key) {
          props.onChange?.(undefined, undefined)
        } else {
          props.onChange?.(option.value, option)
        }
      }}>
        {
          options.map(option => {
            return (
              <option key={option.value} value={option.value}>{option.label}</option>
            )
          })
        }
      </select>
    </Wrapper>
  )
}