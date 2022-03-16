import React from 'react'
import styled from 'styled-components'
import { SvgIcon } from '..'
import CloseIcon from '@assets/images/icons/eye-close.svg'
import OpenIcon from '@assets/images/icons/eye-open.svg'
import { classNamesParser } from '@shared/utils'

interface IProps {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  style?: React.CSSProperties
  type?: 'text' | 'password'
}

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
  overflow: hidden;
  height: 48px;
  border: 1px solid #C5CEDE;
  box-sizing: border-box;
  border-radius: 4px;
  vertical-align: middle;
  padding: 0 12px;
  transition: .5s border-color ease-out;
  &.es-input--focus,
  &.es-input--hover{
    border-color: #6952C4;
  }
  > input {
    width: 100%;
    height: 100%;
    display: inline-block;
    outline: none;
    border: none;
    &::-webkit-input-placeholder { 
      color: #ccc; 
    } 
    &::-moz-placeholder { 
      color: #ccc; 
    }
  }
  .password-icon {
    position: absolute;
    display: flex;
    align-items: center;
    height: 100%;
    width: 32px;
    right: 0;
    top: 0;
    .svg-icon {
      cursor: pointer;
      right: 12px;
      font-size: 18px;
      top: calc(50% - 9px);
    }
  }
`

export default function Input(props: IProps) {
  const [value, setValue] = React.useState('')
  const [hidden, setHidden] = React.useState(true)
  const [isFocus, setFocus] = React.useState(false)
  const [isHover, setHover] = React.useState(false)

  React.useEffect(
    () => {
      setValue(props.value ?? '')
    },
    [props.value]
  )

  const isPassword = React.useMemo(() => props.type === 'password', [props.type])

  return (
    <Wrapper className={classNamesParser({
      'es-input': true,
      'es-input--focus': isFocus,
      'es-input--hover': isHover,
    })} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={props.style}>
      <input onBlur={() => setFocus(false)} onFocus={() => setFocus(true)} value={value} placeholder={props.placeholder}
        type={isPassword && hidden ? 'password' : 'text'}
        onInput={(ev: any) => {
          const val = ev.target.value
          setValue(val)
          props.onChange?.(val)
        }} />
      {
        isPassword && (
          <span className='password-icon' onClick={() => setHidden(hidden => !hidden)}>
            <SvgIcon src={hidden ? CloseIcon : OpenIcon} />
          </span>
        )
      }
    </Wrapper>
  )
}