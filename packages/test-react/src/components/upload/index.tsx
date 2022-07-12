import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import UploadIcon from '@assets/images/icons/exit.svg'

function Button(props: any) {
  return (
    <div></div>
  )
}
function SvgIcon(props: any) {
  return (
    <div></div>
  )
}

interface FileListItem {
  uid: string
  name: string
  url: string
}

interface IProps {
  children?: React.ReactChildren
  style?: React.CSSProperties
  value?: FileListItem[]
  onChange?: (value: FileListItem[]) => void
  accept?: string
  listType?: 'text' | 'picture'
  beforeUpload?: (file: File) => Promise<string>
}

const Wrapper = styled.div`
  outline: none;
  
`

const blobToDataURL = (blob: Blob) => {
  return new Promise<string>((resolve) => {
    let reader = new FileReader()

    reader.onload = (ev: any) => {
      let base64: string = ev.target.result
      resolve(base64)
    }

    reader.readAsDataURL(blob)
  })
}

export default function Upload(props: IProps) {
  const fileRef = useRef<HTMLInputElement | null>(null)
  const [value, setValue] = useState<FileListItem[]>([])

  React.useEffect(
    () => {
      setValue(props.value ?? [])
    },
    [props.value]
  )

  return (
    <Wrapper className='es-upload' style={props.style}>
      <input style={{ display: 'none' }} ref={fileRef} type='file' onChange={(ev) => {
        if (ev.target.files?.length) {
          const file = ev.target.files[0]
          if (/svg|png|jpeg|jpg/.test(file.type)) {
            blobToDataURL(file).then((base64: string) => {
              const value = [{
                uid: file.lastModified + '',
                name: file.name,
                url: base64
              }]
              setValue(value)
              props.onChange?.(value)
            })
          } else {
            props.beforeUpload?.(file).then(url => {
              const value = [{
                uid: file.lastModified + '',
                name: file.name,
                url
              }]
              setValue(value)
              props.onChange?.(value)
            })
          }
        }
      }}/>
      {
        !!props.children
          ? props.children
          : (
            <Button onClick={() => {
              fileRef.current!.click()
            }}>
              <SvgIcon style={{ transform: 'rotate(-90deg)', marginRight: 4 }} src={UploadIcon} />
              <span>上传</span>
            </Button>
          )
      }
      <div className='es-upload__list'>
        {
          value.map(item => {
            if (props.listType === 'picture') {
              return (
                <SvgIcon style={{ fontSize: '4em' }} key={item.uid} src={item.url} />
              )
            }
            return (
              <div key={item.uid}>{item.name}</div>
            )
          })
        }
      </div>
    </Wrapper>
  )
}