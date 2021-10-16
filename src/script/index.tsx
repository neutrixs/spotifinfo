import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Navbar } from './base/navbar'
import { BrowserRouter as Router } from 'react-router-dom'
import { RouteGenerate } from './base/routeGenerate'
import '../style/base/base.css'

declare global{
    interface Window{
        currentFetch:boolean,
        grecaptcha:any
    }
}
window.currentFetch = false

function isLoggedOut():boolean{
    return document.cookie.indexOf('state=') == -1 || document.cookie.indexOf('uname=') == -1
}

ReactDOM.render(
    <Router>
        <Navbar isLoggedOut={isLoggedOut()}/>
        <RouteGenerate isLoggedOut={isLoggedOut()} />
    </Router>,
    document.getElementById('root')
)