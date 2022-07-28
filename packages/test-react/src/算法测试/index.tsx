import React from "react"
import { Routes, Route, Link } from 'react-router-dom';
import Perlin from "./柏林噪声算法"

const routes = [
    { title: '柏林噪声算法', url: 'perlin', component: <Perlin /> },
]

export default function LogicTest() {
    return (
        <Routes>
            {
                routes.map(item => <Route key={item.url} path={`/logic/${item.url}`} element={item.component} />)
            }
            <Route path='/' element={<>
                {
                    routes.map(item => <Link key={item.url} style={{ display: 'block' }} to={`/logic/${item.url}`}>{item.title}</Link>)
                }
            </>} />
        </Routes>
    )
}