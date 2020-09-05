import React from "react";
import Modal from './Modal组件使用'
import SingleTable from './表格单选'
import HsSelect from './封装实用的下拉框组件'
import { Route, Link, Switch } from "react-router-dom";

const routes = [
    { title: 'Modal组件使用', url: 'Modal', component: Modal },
    { title: '表格单选', url: 'SingleTable', component: SingleTable },
    { title: '封装实用的下拉框组件', url: 'HsSelect', component: HsSelect },
]

export default function() {
    return (
        <Switch>
            {
                routes.map(item => <Route key={item.url} path={`/antd/${item.url}`} component={item.component} />)
            }
            <Route path='/antd/single-table' component={SingleTable} />
            <Route path='/' render={() => (
                <>
                    {
                        routes.map(item => <Link key={item.url} style={{ display: 'block' }} to={`/antd/${item.url}`}>{item.title}</Link>)
                    }
                </>
            )} />
        </Switch>
    )
}