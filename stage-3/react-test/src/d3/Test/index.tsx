import React, { useEffect, useRef, useState } from "react"
import * as d3 from 'd3'
import { getAreaIndex, HexagonPeakTurn } from "./logic"

export default () => {
    const inst = useRef(new HexagonPeakTurn())
    
    useEffect(() => {
        const svg = d3.select('#container')
            .append('svg')
            .attr('width', 600)
            .attr('height', 600)
        const list = inst.current.getList()
        list.map(hexagon => {
            const [x, y] = hexagon.getLocation()
            const points = hexagon.getPoints()
            const g = svg.append('g').attr('transform', `translate(${x}, ${y})`)
            g.append('text').text(`${hexagon.getX()},${hexagon.getY()}`)
            g.append('polygon')
                .attr('fill', 'transparent')
                .attr('points', points.map(p => [p.x, p.y]).join(' '))
                .on('click', (e) => {
                    const angle = Math.atan2(e.clientY - y, e.clientX - x)
                    const index = getAreaIndex(angle)
                    hexagon.toggle(index)
                })
            const lines = hexagon.getLines()
            lines.forEach((line, index) => {
                const [p1, p2] = line.getPoints()
                const lineSvg = g.append('line')
                    .attr('x1', p1.x)
                    .attr('y1', p1.y)
                    .attr('x2', p2.x)
                    .attr('y2', p2.y)
                    .attr('stroke-width', 4)
                    .attr('stroke', 'pink')
                    .on('click', () => {
                        hexagon.toggle(index)
                    })
                // @ts-ignore
                line.setSvg(lineSvg.selection()._groups[0][0])
            })
            points.forEach(p => {
                g.append('circle')
                    .attr('cx', p.x)
                    .attr('cy', p.y)
                    .attr('r', 3)
                    .attr('stroke-width', 2)
                    .attr('stroke', '#fff')
                    .attr('fill', '#aaa')
            })
        })
    }, [])
    return (
        <div id='container'></div>
    )
}