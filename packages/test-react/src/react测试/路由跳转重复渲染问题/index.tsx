import { HashRouter as Router, Route, Link, withRouter, RouteComponentProps } from 'react-router-dom'
import React from 'react'
import Detail from './Detail'

interface IProps extends Partial<RouteComponentProps> {
}

const Test = withRouter(function (props: IProps) {
    function click() {
        props.history.push({
            pathname: '/detail/13123',
        })
    }
    return (
        <div onClick={click}>click</div>
    )
})

export default function() {
    return (
        <Router>
            <Test />
            <br />
            <Link to='/detail/12123'>click</Link>
            <Route path='/detail/:id' component={Detail}></Route>
        </Router>
    )
}