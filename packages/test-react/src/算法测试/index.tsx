import React from "react"
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Perlin from "./柏林噪声算法"

const routes = [
    { title: '柏林噪声算法', url: 'perlin', component: Perlin },
]

export default function LogicTest() {
    return (
        <Switch>
            {
                routes.map(item => <Route key={item.url} path={`/logic/${item.url}`} component={item.component} />)
            }
            <Route path='/' render={() => (
                <>
                    {
                        routes.map(item => <Link key={item.url} style={{ display: 'block' }} to={`/logic/${item.url}`}>{item.title}</Link>)
                    }
                </>
            )} />
        </Switch>
    )
}