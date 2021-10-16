import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Navbar } from './base/navbar'
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
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
            <Switch>
                <Route exact path="/">
                    <h1>Hello, world!</h1>
                </Route>
            </Switch>
        </div>
    </Router>,
    document.getElementById('root')
)