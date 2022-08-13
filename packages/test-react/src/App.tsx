import React from 'react';
import Test from './react测试'
import AntdTest from './antd组件案例'
import Comps from './组件测试'
import CustomHooks from './自定义Hooks'
import { Routes, Route, Link } from 'react-router-dom';
import D3 from './d3';
import LogicTest from './算法测试';
import ReactMarkdown from './react-markdown';
import GraphNodeTest from './GraphNode测试';

const configList = [
    { key: 'logic', element: <LogicTest />, title: '算法测试' },
    { key: 'hooks', element: <CustomHooks />, title: '自定义Hooks' },
    { key: 'components', element: <Comps />, title: '组件测试' },
    { key: 'antd', element: <AntdTest />, title: 'antd组件测试' },
    { key: 'test', element: <Test />, title: 'react测试' },
    { key: 'd3', element: <D3 />, title: 'D3.js' },
    { key: 'markdown', element: <ReactMarkdown />, title: 'markdown' },
    { key: 'graph-node', element: <GraphNodeTest />, title: 'GraphNode测试' },
]

function App() {

    return (
        <div className="App">
            <Routes>
                {
                    configList.map(item => <Route key={item.key} path={'/' + item.key} element={item.element} />)
                }
                <Route key='/' path='/' element={<>
                    {
                        configList.map(item => <Link key={item.key} style={{ display: 'block' }} to={'/' + item.key}>{item.title}</Link>)
                    }
                </>} />
            </Routes>
        </div>
    );
}

export default App;
