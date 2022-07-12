import React, { useEffect, useState } from "react"
import './index.css'
import * as d3 from 'd3'
import dagre from 'dagre'

const list = {
    nodes: [
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
    const width = 100, height = 40
    useEffect(() => {
        var g = new dagre.graphlib.Graph()
        g.setGraph({}).setDefaultEdgeLabel(() => ({}))
        list.nodes.forEach(node => g.setNode(node.id, { width, height, value: node.id }))
        list.edges.forEach(edge => g.setEdge(edge.source, edge.target))
        dagre.layout(g)

        const svg = d3
            .select('#container')
            .append('svg')
            .attr('width', 800)
            .attr('height', 600)
        
        g.nodes().forEach(v => {
            const node = g.node(v)
            svg.append('rect')
                .attr('width', width)
                .attr('height', height)
                .attr('transform', `translate(${node.x},${node.y})`)
        })
        g.edges().forEach(v => {
            const [start, ...points] = g.edge(v).points
            const m = `M${start.x + width / 2} ${start.y + height / 2} `
            const l = points.reduce<string>((s, p) => {
                s += `L${p.x + width / 2} ${p.y + height / 2} `
                return s
            }, '')
            svg.append('path')
                .attr('d', m + l)
                .attr('fill', 'none')
                .attr('stroke', 'red')
                .attr('stroke-width', '3')
        })

    }, [])
    return (
        <div id='container'></div>
    )
}