import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import PeakTurn from './games/峰回路转'
import Game2048 from './games/Game2048'
import Number16 from './games/数字华容道'
import RotateJigsaw from './games/旋转拼图'
import TurnBlackWhite from './games/黑白无双'
import EitherBlackWhite from './games/黑白迭代'

const routes = [
    { title: '峰回路转', url: 'PeakTurn', component: PeakTurn },
    { title: '数字2048', url: 'Game2048', component: Game2048 },
    { title: '数字华容道', url: 'Number16', component: Number16 },
    { title: '旋转拼图', url: 'RotateJigsaw', component: RotateJigsaw },
    { title: '黑白无双', url: 'TurnBlackWhite', component: TurnBlackWhite },
    { title: '黑白迭代', url: 'EitherBlackWhite', component: EitherBlackWhite },
]

function App() {

    return (
        <div className="App">
            <Router>
                <Switch>
                    {
                        routes.map(item => <Route key={item.url} path={`/${item.url}`} component={item.component} />)
                    }
                    <Route path='/' render={() => (
                        <>
                            {
                                routes.map(item => <Link key={item.url} style={{ display: 'block' }} to={`/${item.url}`}>{item.title}</Link>)
                            }
                        </>
                    )} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
