import clsx from "clsx"
import { useCallback, useMemo, useRef, useState } from "react"
import styled from "styled-components"

const Wrapper = styled.div<{ labelRect: DOMRect }>`
    .hs-dropdown {
        position: relative;
        &__label {
            cursor: pointer;
            &.disabled {
                cursor: not-allowed;
            }
        }
        &__content {
            position: fixed;
            background-color: #fff;
            top: ${props => props.labelRect.top + props.labelRect.height}px;
            box-shadow: 0 0 5px #aaa;
            display: none;
            &.visible {
                display: block;
            }
            &.full {
                width: 100%;
                left: 0;
            }
            &.before {
                left: ${props => props.labelRect.left}px;
            }
            &.after {
                left: ${props => props.labelRect.right}px;
                transform: translateX(-100%);
            }
        }
        &__mask {
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            display: none;
            &.visible {
                display: block;
            }
        }
    }
`

export default function DropDown(props: {
    label: React.ReactNode
    className?: string
    style?: React.CSSProperties
    labelStyle?: React.CSSProperties
    contentStyle?: React.CSSProperties
    children: React.ReactNode
    position?: 'before' | 'after' | 'full'
    disbled?: boolean
    trigger?: 'hover' | 'click'
}) {
    const labelRef = useRef<HTMLSpanElement>(null)
    const [visible, setVisible] = useState(false)
    const timerRef = useRef<number>()

    const labelRect = useMemo<DOMRect>(() => {
        if (labelRef.current) {
            return labelRef.current.getBoundingClientRect()
        }
        return new DOMRect(0, 0, 0, 0)
    }, [visible])

    const handleMouseEnter = useCallback(
        () => {
            if (props.disbled) return

            if (props.trigger === 'hover') {
                clearTimeout(timerRef.current)
                setVisible(true)
            }
        },
        [props.trigger, props.disbled]
    )

    const handleMouseLeave = useCallback(
        () => {
            if (props.trigger === 'hover') {
                timerRef.current = window.setTimeout(() => {
                    setVisible(false)
                }, 100)
            }
        },
        [props.trigger]
    )

    const handleClick = useCallback(
        () => {
            if (props.disbled) return
            if (props.trigger !== 'hover') {
                setVisible(visible => !visible)
            }
        },
        [props.trigger]
    )

    return (
        <Wrapper labelRect={labelRect} style={props.style} className={clsx('hs-dropdown', props.className)}>
            <span ref={labelRef} style={props.labelStyle}
                onMouseLeave={handleMouseLeave} onMouseEnter={handleMouseEnter} onClick={handleClick} 
                className={
                clsx("hs-dropdown__label", {
                    disabled: props.disbled,
                })
            }>{props.label}</span>
            {
                props.trigger !== 'hover' && (
                    <div className={clsx("hs-dropdown__mask", {
                        visible
                    })} onClick={() => {
                        setVisible(false)
                    }}>
                    </div>
                )
            }
            <div onMouseLeave={handleMouseLeave} onMouseEnter={handleMouseEnter} onClick={(ev) => {
                ev.stopPropagation()
            }} style={props.contentStyle} className={clsx("hs-dropdown__content", {
                'full': props.position === 'full',
                'before': props.position === 'before',
                'after': props.position === 'after',
                visible,
            })}>
                {props.children}
            </div>
        </Wrapper>
    )
}