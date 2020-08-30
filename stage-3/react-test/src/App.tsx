import React from 'react';
import Test from './react测试'
import AntdTest from './antd组件案例'
import Games from './games'
import Comps from './组件测试'
import CustomHooks from './自定义Hooks'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

function App() {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route path='/hooks' component={CustomHooks} />
                    <Route path='/components' component={Comps} />
                    <Route path='/antd' component={AntdTest} />
                    <Route path='/games' component={Games} />
                    <Route path='/test' component={Test} />
                    <Route path='/' render={() => (
                        <>
                            <Link style={{ display: 'block' }} to='/hooks'>自定义Hooks</Link>
                            <Link style={{ display: 'block' }} to='/components'>组件测试</Link>
                            <Link style={{ display: 'block' }} to='/antd'>antd组件测试</Link>
                            <Link style={{ display: 'block' }} to='/games'>games</Link>
                            <Link style={{ display: 'block' }} to='/test'>react测试</Link>
                        </>
                    )} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
