import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Navbar } from './base/navbar'
import { BrowserRouter as Router } from 'react-router-dom'
import { RouteGenerate } from './base/routeGenerate'
import '../style/base/base.scss'

declare global{
    interface Window{
        currentFetch:boolean,
        grecaptcha:any,
        ColorThief:any
    }
}
window.currentFetch = false

function isLoggedOut():boolean{
    return document.cookie.indexOf('state=') == -1 || document.cookie.indexOf('uname=') == -1
}

class Main extends React.Component{
    constructor(props:{}){
        super(props)
    }

    render(){
        return(
            <Router>
                <Navbar isLoggedOut={isLoggedOut()}/>
                <RouteGenerate isLoggedOut={isLoggedOut()} />
            </Router>
        )
    }
}

ReactDOM.render(<Main />,document.getElementById('root'))