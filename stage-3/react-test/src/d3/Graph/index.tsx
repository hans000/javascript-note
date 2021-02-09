import React, { useEffect } from "react"
import './index.css'
import * as d3 from 'd3'

const list = {
    nodeInfos: [
    　　{ id: "a", label: "a", },
    　　{ id: "b", label: "b", },
    　　{ id: "c", label: "c", },
    　　{ id: "d", label: "d", },
    　　{ id: "e", label: "e", },
    　　{ id: "f", label: "f", },
    　　{ id: "g", label: "g", },
    　　{ id: "h", label: "h", },
    　　{ id: "i", label: "i", },
    　　{ id: "j", label: "j", },
    　　{ id: "k", label: "k", },
    
    ],
    edges: [
    　　{ source: "a", target: "b", },
    　　{ source: "a", target: "c", },
    　　{ source: "a", target: "d", },
    　　{ source: "b", target: "e", },
    　　{ source: "c", target: "e", },
    　　{ source: "d", target: "f", },
    　　{ source: "d", target: "g", },
    　　{ source: "d", target: "h", },
    　　{ source: "e", target: "i", },
    　　{ source: "f", target: "j", },
    　　{ source: "g", target: "j", },
    　　{ source: "h", target: "j", },
    　　{ source: "i", target: "k", },
    　　{ source: "j", target: "k", },
    ]
}

export default () => {
    useEffect(() => {

        d3.hierarchy(list.nodeInfos)
    }, [])
    return (
        <div id='container'>
        </div>
    )
}