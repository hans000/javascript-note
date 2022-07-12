import React from "react";
import { Route, Link, Switch } from "react-router-dom";
import Graph from "./Graph";
import Test from "./Test";

const routes = [
    { title: 'Graph', url: 'Graph', component: Graph },
    { title: 'Test', url: 'Test', component: Test },
]

export default function() {
    return (
        <Switch>
            {
                routes.map(item => <Route key={item.url} path={`/d3/${item.url}`} component={item.component} />)
            }
            <Route path='/' render={() => (
                <>
                    {
                        routes.map(item => <Link key={item.url} style={{ display: 'block' }} to={`/d3/${item.url}`}>{item.title}</Link>)
                    }
                </>
            )} />
        </Switch>
    )
}