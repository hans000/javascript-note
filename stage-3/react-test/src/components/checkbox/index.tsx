import React, { useCallback, useRef } from 'react';
import styled from 'styled-components'
import CheckboxIcon from '@assets/images/icons/checkbox.svg'
import CheckboxCheckedIcon from '@assets/images/icons/checkbox-checked.svg'
import CheckboxHoverIcon from '@assets/images/icons/checkbox-hover.svg'

interface IProps {
  value?: string[]
  onChange?: (value: string[]) => void
  options: Array<{ label: string; value: string }>
  style?: React.CSSProperties
  itemStyle?: React.CSSProperties
}

const Wrapper = styled.div`
  display: inline-block;
  label {
    margin-right: 48px;
  }
  span {
    color: #2F3B4F;
    padding-left: 28px;
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
      background-image: url('${CheckboxIcon}');
      width:16px;
      height:16px;
      position: absolute;
      z-index: 100;
      left: 0;
      top: 0;
    }

    &:hover:after {
      background-image: url('${CheckboxHoverIcon}');
    }

    &:checked:after {
      background-image: url('${CheckboxCheckedIcon}');
    }
  }
`
export function Checkbox(props: IProps) {
  const name = useRef(Math.random().toString().slice(2))
  const [value, setValue] = React.useState<string[]>([])

  React.useEffect(
    () => {
      setValue(props.value ?? [])
    },
    [props.value]
  )

  const handleChange = useCallback((item: { label: string; value: string }) => {
    const newValue = value.includes(item.value) ? value.filter(el => el !== item.value) : [...value, item.value]
    setValue(newValue);
    props.onChange?.(newValue);
  }, [value]);

  return (
    <Wrapper style={props.style}>
      {
        props.options.map(item => {
          return (
            <label style={props.itemStyle} key={item.value}>
              <input checked={value.includes(item.value)} onChange={() => handleChange(item)} name={name.current} type='checkbox' value={item.value} />
              <span>{item.label}</span>
            </label>
          )
        })
      }
    </Wrapper>
  )
}
