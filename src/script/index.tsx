import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Navbar } from './base/navigation'
import '../style/base/base.css'

function isLoggedOut():boolean{
    return document.cookie.indexOf('state=') == -1 || document.cookie.indexOf('uname=') == -1
}

ReactDOM.render(
    <>
        <Navbar isLoggedOut={isLoggedOut()}/>
        <div id="page"></div>
        <h1>Hello, world!</h1>
    </>,
    document.getElementById('root')
)