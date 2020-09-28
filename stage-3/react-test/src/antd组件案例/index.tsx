import React from "react";
import Modal from './Modal组件使用'
import SingleTable from './表格单选'
import HsSelect from './封装实用的下拉框组件'
import ComplexForm from './复杂表单'
import { Route, Link, Switch } from "react-router-dom";
import FormChange from "./表单测试字段更改";
import HsInput from "./输入框.tsx";
import Scroll from "./点击滚动指定位置";

const routes = [
    { title: 'Modal组件使用', url: 'Modal', component: Modal },
    { title: '表格单选', url: 'SingleTable', component: SingleTable },
    { title: '封装实用的下拉框组件', url: 'HsSelect', component: HsSelect },
    { title: '复杂表单', url: 'ComplexForm', component: ComplexForm },
    { title: '表单测试字段更改', url: 'FormChange', component: FormChange },
    { title: '点击滚动指定位置', url: 'Scroll', component: Scroll },
    { title: '输入框', url: 'HsInput', component: HsInput },
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