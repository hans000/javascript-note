import React from "react";
import Modal from './Modal组件使用'
import SingleTable from './表格单选'
import HsSelect from './封装实用的下拉框组件'
import ComplexForm from './复杂表单'
import { Route, Link, Routes } from "react-router-dom";
import HsInput from "./输入框.tsx";
import Scroll from "./点击滚动指定位置";
import FormList from "./表单列表";
import ComplexTable from "./多级表格";
import Fomula from "./公式编辑器";
import Context from "./测试Context";
import Tree from "./测试树组件";

const routes = [
    { title: 'Modal组件使用', url: 'Modal', component: <Modal /> },
    { title: '表格单选', url: 'SingleTable', component: <SingleTable /> },
    { title: '封装实用的下拉框组件', url: 'HsSelect', component: <HsSelect /> },
    { title: '复杂表单', url: 'ComplexForm', component: <ComplexForm /> },
    { title: '点击滚动指定位置', url: 'Scroll', component: <Scroll /> },
    { title: '输入框', url: 'HsInput', component: <HsInput /> },
    { title: '表单列表', url: 'FormList', component: <FormList /> },
    { title: '多级表格', url: 'ComplexTable', component: <ComplexTable /> },
    { title: '公式编辑器', url: 'Fomula', component: <Fomula /> },
    { title: '测试Context', url: 'Context', component: <Context /> },
    { title: '测试树组件', url: 'Tree', component: <Tree /> },
]

export default function() {
    return (
        <Routes>
            {
                routes.map(item => <Route key={item.url} path={`/antd/${item.url}`} element={item.component} />)
            }
            <Route path='/antd/single-table' element={<SingleTable />} />
            <Route path='/' element={<>
                {
                    routes.map(item => <Link key={item.url} style={{ display: 'block' }} to={`/antd/${item.url}`}>{item.title}</Link>)
                }
            </>} />
        </Routes>
    )
}