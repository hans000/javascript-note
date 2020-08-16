import useReqDetail from "./useReqDetail"
import React from "react"
import { withRouter } from 'react-router-dom'

export default withRouter(function() {
    const data = useReqDetail('/detail', '12123')
    return (
        <div>
            {
                Object.entries(data).map(([key, value]) => <div key={key}>{value}</div>)
            }
        </div>
    )
})