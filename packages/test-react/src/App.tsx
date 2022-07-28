import React from 'react';
import Test from './react测试'
import AntdTest from './antd组件案例'
import Comps from './组件测试'
import CustomHooks from './自定义Hooks'
import { Routes, Route, Link } from 'react-router-dom';
import D3 from './d3';
import LogicTest from './算法测试';

function App() {

    return (
        <div className="App">
            <Routes>
                <Route key='logic' path='/logic' element={<LogicTest />} />
                <Route key='hooks' path='/hooks' element={<CustomHooks />} />
                <Route key='components' path='/components' element={<Comps />} />
                <Route key='antd' path='/antd' element={<AntdTest />} />
                <Route key='test' path='/test' element={<Test />} />
                <Route key='d3' path='/d3' element={<D3 />} />
                <Route key='/' path='/' element={<>
                    <Link key='logic' style={{ display: 'block' }} to='/logic'>算法测试</Link>
                    <Link key='hooks' style={{ display: 'block' }} to='/hooks'>自定义Hooks</Link>
                    <Link key='components' style={{ display: 'block' }} to='/components'>组件测试</Link>
                    <Link key='antd' style={{ display: 'block' }} to='/antd'>antd组件测试</Link>
                    <Link key='test' style={{ display: 'block' }} to='/test'>react测试</Link>
                    <Link key='graph' style={{ display: 'block' }} to='/d3'>d3</Link>
                </>} />
            </Routes>
        </div>
    );
}

export default App;
