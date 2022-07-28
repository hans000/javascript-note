import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import LeaderFlex from './干部任免审批flex'
import LeaderGrid from './干部任免审批grid'

const routes = [
    { title: '干部任免审批flex', url: 'LeaderFlex', component: <LeaderFlex /> },
    { title: '干部任免审批grid', url: 'LeaderGrid', component: <LeaderGrid /> },
]

export default function() {
    return (
        <Routes>
            {
                routes.map(item => <Route key={item.url} path={`/components/${item.url}`} element={item.component} />)
            }
            {/* <Route path='/antd/single-table' component={SingleTable} /> */}
            <Route path='/' element={<>
                {
                    routes.map(item => <Link key={item.url} style={{ display: 'block' }} to={`/components/${item.url}`}>{item.title}</Link>)
                }
            </>} />
        </Routes>
    )
}