/**
 * Copyright 2022 EasyStack, Inc.
 */
import React, { useCallback, useRef } from 'react';
import styled from 'styled-components'
import RadioIcon from '@assets/images/icons/radio.svg'
import RadioCheckedIcon from '@assets/images/icons/radio-checked.svg'

interface IProps {
  value?: string
  onChange?: (value: string, record: { label: string; value: string }) => void
  options: Array<{ label: string; value: string }>
  style?: React.CSSProperties
  itemStyle?: React.CSSProperties
}

const Wrapper = styled.div`
  label {
    margin-right: 48px;
    white-space: nowrap;
  }
  span {
    color: #2F3B4F;
    padding-left: 36px;
    cursor: pointer;
  }
  input {
    position: absolute;
    width: 0;
    height: 0;
    color: #6952C4;
    cursor: pointer;
    &:after {
      content:'';
      background-image: url('${RadioIcon}');
      width:16px;
      height:16px;
      position: absolute;
      z-index: 100;
      left: 0;
      top: 0;
    }

    &:checked:after {
      background-image: url('${RadioCheckedIcon}');
    }
  }
`
export function Radio(props: IProps) {
  const name = useRef(Math.random().toString().slice(2))
  const [value, setValue] = React.useState<string>('')
  const { onChange } = props;

  React.useEffect(
    () => {
      setValue(props.value ?? '')
    },
    [props.value]
  )

  const handleChange = useCallback((record: { label: string; value: string; }) => {
    if (typeof onChange === 'function') {
      onChange(record.value, record);
    }
    setValue(record.value);
  }, [onChange]);

  return (
    <Wrapper className='es-radio' style={props.style}>
      {
        props.options.map(item => {
          return (
            <label style={props.itemStyle} key={item.value}>
              <input checked={item.value === value} onChange={() => handleChange(item)} name={name.current} type='radio' value={item.value} />
              <span>{item.label}</span>
            </label>
          )
        })
      }
    </Wrapper>
  )
}
