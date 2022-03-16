import React from "react"
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import DirtGrassComponent from "./pages/dirt-grass";
import EffectComponent from "./pages/effect";
import LinearInsertComponent from "./pages/linear-insert";
import Perlin1DimisionComponent from "./pages/perlin-1-d";
import Perlin2DimisionComponent from "./pages/perlin-2-d";
import Perlin3DimisionComponent from "./pages/perlin-3-d";
import WaveComponent from "./pages/wave";

const routes = [
    { title: '线性插值', url: 'linear-insert', component: LinearInsertComponent },
    { title: '一维柏林噪声', url: 'perlin-1-d', component: Perlin1DimisionComponent },
    { title: '二维柏林噪声', url: 'perlin-2-d', component: Perlin2DimisionComponent },
    { title: '三维柏林噪声', url: 'perlin-3-d', component: Perlin3DimisionComponent },
    // { title: '音乐可视化', url: 'music', component: WaveComponent },
    { title: '土地加草坪', url: 'dirt-grass', component: DirtGrassComponent },
    { title: '溶解特效', url: 'effect', component: EffectComponent },
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