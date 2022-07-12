import { useNavigate } from "react-router-dom"
import HsImage from "../HsImage"
import './index.less'

interface IProps {
    url?: string
    title: string
    description: string
    path: string
}

export default function Card(props: IProps) {
    const navigate = useNavigate()

    return (
        <div className="card" onClick={() => {
            navigate(props.path)
        }}>
            <HsImage style={{ height: 150 }} url={props.url} />
            <h3>{props.title}</h3>
            <p>{props.description}</p>
        </div>
    )
}