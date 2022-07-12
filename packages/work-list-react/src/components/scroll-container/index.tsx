import clsx from "clsx";
import { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components"

const Wrapper = styled.div`
    position: relative;
    overflow: hidden;
    .indicator {
        &__left, &__right {
            cursor: pointer;
            user-select: none;
            position: absolute;
            display: flex;
            justify-content: center;
            align-items: center;
            left: 0;
            top: 0;
            height: 100%;
            padding: 4px;
            background-image: linear-gradient(to left, #FFFFFF00, #FFFFFFFF);
            &.hidden {
                display: none;
            }
        }
        &__right {
            right: 0;
            left: inherit;
            background-image: linear-gradient(to right, #FFFFFF00, #FFFFFFFF);
        }
        &.hidden {
            display: none;
        }
    }
    .wrapper {
        transition: transform .5s;
    }
`

export default function ScrollContainer(props: {
    children: React.PropsWithChildren<any>;
    className?: string
    style?: React.CSSProperties
    step?: number
}) {
    const [offset, setOffset] = useState(0)
    const [max, setMax] = useState(0)
    const nodeRef = useRef<HTMLDivElement>(null)

    useEffect(
        () => {
            setMax(nodeRef.current!.scrollWidth - nodeRef.current!.offsetWidth)
            function handle() {
                setMax(nodeRef.current!.scrollWidth - nodeRef.current!.offsetWidth)
                setOffset(offset => {
                    const v = Math.min(max, offset)
                    return v
                })
            }
            window.addEventListener('resize', handle)
            return () => {
                window.removeEventListener('resize', handle)
            }
        },
        [max]
    )
    
    function translate(step: number) {
        setOffset(offset => {
            const v = offset + step
            return Math.min(Math.max(v, 0), max)
        })
    }

    const step = useMemo(() => props.step || 100, [props.step])

    return (
        <Wrapper style={props.style} className={clsx('scroll-container', props.className)}>
            <div ref={nodeRef} style={{ transform: `translateX(${-offset}px)` }} className="wrapper">{props.children}</div>
            <div className={clsx("indicator", { hidden: max <= 0 })}>
                <i onClick={() => {
                    translate(-1 * step)
                }} className={clsx('indicator__left', { hidden: offset === 0 })}>
                    <span>{'<'}</span>
                </i>
                <i onClick={() => {
                    translate(step)
                }} className={clsx('indicator__right', { hidden: offset === max })}>
                    <span>{'>'}</span>
                </i>
            </div>
        </Wrapper>
    )
}