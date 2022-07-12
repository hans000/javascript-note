import { clsx } from '../../utils'
import './index.less'

interface IProps {
    url: string
    style?: React.CSSProperties
    className?: string
}

export default function HsImage(props: IProps) {
    return (
        <div style={Object.assign({ backgroundImage: `url(${props.url})` }, props.style)} className={clsx('hs-image', props.className)}></div>
    )
}