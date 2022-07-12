import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import LeaderFlex from './干部任免审批flex'
import LeaderGrid from './干部任免审批grid'

const routes = [
    { title: '干部任免审批flex', url: 'LeaderFlex', component: LeaderFlex },
    { title: '干部任免审批grid', url: 'LeaderGrid', component: LeaderGrid },
]

export default function() {
    return (
        <Switch>
            {
                routes.map(item => <Route key={item.url} path={`/components/${item.url}`} component={item.component} />)
            }
            {/* <Route path='/antd/single-table' component={SingleTable} /> */}
            <Route path='/' render={() => (
                <>
                    {
                        routes.map(item => <Link key={item.url} style={{ display: 'block' }} to={`/components/${item.url}`}>{item.title}</Link>)
                    }
                </>
            )} />
        </Switch>
    )
}