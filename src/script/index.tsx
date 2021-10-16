import * as React from 'react';
import { lazy } from 'react';
import * as ReactDOM from 'react-dom';
import { Navbar } from './base/navbar'
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import { RouteGenerate } from './routeGenerate'
import '../style/base/base.css'

function isLoggedOut():boolean{
    return document.cookie.indexOf('state=') == -1 || document.cookie.indexOf('uname=') == -1
}

ReactDOM.render(
    <Router>
        <Switch>
            <Route>
                <Navbar isLoggedOut={isLoggedOut()}/>
            </Route>
        </Switch>
        <div id="page">
            <RouteGenerate isLoggedOut={isLoggedOut()} />
        </div>
    </Router>,
    document.getElementById('root')
)