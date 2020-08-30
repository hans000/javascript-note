import React from "react";
import Modal from './Modal组件使用'
import SingleTable from './表格单选'
import { Route, Link, Switch } from "react-router-dom";

export default function() {
    return (
        <Switch>
            <Route path='/antd/modal' component={Modal} />
            <Route path='/antd/single-table' component={SingleTable} />
            <Route path='/' render={() => (
                <>
                    <Link style={{ display: 'block' }} to='/antd/modal'>Modal组件使用</Link>
                    <Link style={{ display: 'block' }} to='/antd/single-table'>表格单选</Link>
                </>
            )} />
        </Switch>
    )
}