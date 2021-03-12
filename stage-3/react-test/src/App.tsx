import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import PeakTurn from './games/峰回路转'
import Game2048 from './games/Game2048'
import Number16 from './games/数字华容道'
import RotateJigsaw from './games/旋转拼图'
import TurnBlackWhite from './games/黑白无双'
import EitherBlackWhite from './games/黑白迭代'
import './index.css'

const routes = [
    { title: '数字华容道', url: 'Number16', component: Number16 },
    { title: '旋转拼图', url: 'RotateJigsaw', component: RotateJigsaw },
    { title: '黑白迭代', url: 'EitherBlackWhite', component: EitherBlackWhite },
    { title: '黑白无双', url: 'TurnBlackWhite', component: TurnBlackWhite },
    { title: '峰回路转', url: 'PeakTurn', component: PeakTurn },
    { title: '数字2048', url: 'Game2048', component: Game2048 },
]

const subDomain = 'veg-game'

function App() {

    return (
        <div className="App">
            <Router>
                <Switch>
                    {
                        routes.map(item => <Route key={item.url} path={`/${subDomain}/${item.url}`} component={item.component} />)
                    }
                    <Route path={`/`} render={() => (
                        <div>
                            <h2 style={{ textAlign: 'center', padding: 16 }}>游戏目录</h2>
                            {
                                routes.map(item => <Link key={item.url} className='nav-item' to={`/${subDomain}/${item.url}`}>{item.title}</Link>)
                            }
                        </div>
                    )} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
