import React from "react"
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import LinearInsertComponent from "./pages/linear-insert";
import Perlin1DimisionComponent from "./pages/perlin-1-d";

const routes = [
    { title: '线性插值', url: 'linear-insert', component: LinearInsertComponent },
    { title: '一维柏林噪声', url: 'perlin-1-d', component: Perlin1DimisionComponent },
]

export default function LogicTest() {
    return (
        <Switch>
            {
                routes.map(item => <Route key={item.url} path={`/logic/perlin/${item.url}`} component={item.component} />)
            }
            <Route path='/' render={() => (
                <>
                    {
                        routes.map(item => <Link key={item.url} style={{ display: 'block' }} to={`/logic/perlin/${item.url}`}>{item.title}</Link>)
                    }
                </>
            )} />
        </Switch>
    )
}