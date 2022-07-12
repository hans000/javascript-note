import React from 'react';
import Test from './react测试'
import AntdTest from './antd组件案例'
import Games from './games'
import Comps from './组件测试'
import CustomHooks from './自定义Hooks'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import D3 from './d3';
import LogicTest from './算法测试';

function App() {

    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route key='logic' path='/logic' component={LogicTest} />
                    <Route key='hooks' path='/hooks' component={CustomHooks} />
                    <Route key='components' path='/components' component={Comps} />
                    <Route key='antd' path='/antd' component={AntdTest} />
                    <Route key='games' path='/games' component={Games} />
                    <Route key='test' path='/test' component={Test} />
                    <Route key='d3' path='/d3' component={D3} />
                    <Route key='/' path='/' render={() => (
                        <>
                            <Link key='logic' style={{ display: 'block' }} to='/logic'>算法测试</Link>
                            <Link key='hooks' style={{ display: 'block' }} to='/hooks'>自定义Hooks</Link>
                            <Link key='components' style={{ display: 'block' }} to='/components'>组件测试</Link>
                            <Link key='antd' style={{ display: 'block' }} to='/antd'>antd组件测试</Link>
                            <Link key='games' style={{ display: 'block' }} to='/games'>games</Link>
                            <Link key='test' style={{ display: 'block' }} to='/test'>react测试</Link>
                            <Link key='graph' style={{ display: 'block' }} to='/d3'>d3</Link>
                        </>
                    )} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
