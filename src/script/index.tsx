import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Navbar } from './base/navbar'
import '../style/base/base.css'

function isLoggedOut(){
    return document.cookie.indexOf('state=') == -1 || document.cookie.indexOf('uname=') == -1
}

ReactDOM.render(
    <>
        <Navbar/>
        <h1>Hello, world!</h1>
    </>,
    document.getElementById('root')
)