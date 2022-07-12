import { useEffect, useState } from "react"
import styled from "styled-components"
import clsx from 'clsx'
import { useLocation, useNavigate } from "react-router-dom"

const Wrapper = styled.ul`
    z-index: 999;
    position: fixed;
    left: 10px;
    border-radius: 8px;
    box-shadow: 0 0 10px #ccc;
    background-color: #fff;
    top: 50%;
    transform: translateY(-50%);
    li {
        cursor: pointer;
        padding: 4px 16px;
        &:hover {
            background-color: #eee;
        }
        &.active {
            background-color: #eee;
        }
    }
`

const data = [
    { label: '章节1', id: 'caption1' },
    { label: '章节2', id: 'caption2' },
    { label: '章节3', id: 'caption3' },
    { label: '章节4', id: 'caption4' },
    { label: '章节5', id: 'caption5' },
]

export default function Sidebar(props: {

}) {
    const [active, setActive] = useState('')
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        const nodes = Array.from(document.querySelectorAll('#caption1,#caption2,#caption3,#caption4,#caption5')) as unknown as HTMLElement[]
        function scrollHandle() {
          const target = nodes.find(node => {
            const { top } = node.getBoundingClientRect()
            return top > -46 && top < innerHeight
          })
          if (target) {
            setActive(target.id)
          }
        }
        window.addEventListener('scroll', scrollHandle)
        return () => {
          window.removeEventListener('scroll', scrollHandle)
        }
    }, [])

    return (
        <Wrapper>
            {
                data.map(el => {
                    return (
                        <li key={el.id} onClick={(ev) => {
                            navigate(location.pathname + '#' + el.id, { replace: true })
                            document.getElementById(el.id)?.scrollIntoView({
                                behavior: 'smooth'
                            })
                        }} className={clsx({
                            active: el.id === active
                        })}>{el.label}</li>
                    )
                })
            }
        </Wrapper>
    )
}