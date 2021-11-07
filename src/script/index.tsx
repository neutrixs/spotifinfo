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

interface states{
    isDark:boolean
}

class Main extends React.Component<{},states>{
    constructor(props:{}){
        super(props)

        this.state = {
            /**
             * determine if the theme is dark (defaults to dark theme if it doesn't exist)
             */
            isDark: (():boolean=>{
                if(!localStorage.getItem('isDark')) return true

                if(localStorage.getItem('isDark') == 'true'){
                    return true
                }
                if(localStorage.getItem('isDark') == 'false'){
                    return false
                }

                return true
            })()
        }

        this.toggleTheme = this.toggleTheme.bind(this)
    }

    componentDidMount(){
        localStorage.setItem('isDark', this.state.isDark.toString())
    }

    toggleTheme(){
        this.setState(prevState => ({
            isDark: !prevState.isDark
        }))

        localStorage.setItem('isDark', this.state.isDark.toString())
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