import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Navbar } from './base/ts/navbar'
import { BrowserRouter as Router } from 'react-router-dom'
import { RouteGenerate } from './base/ts/routeGenerate'
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
                const isDark = localStorage.getItem('isDark')

                if(isDark != 'true' && isDark != 'false') return true

                return isDark == 'true'
            })()
        }

        this.toggleTheme = this.toggleTheme.bind(this)
    }

    componentDidMount(){
        localStorage.setItem('isDark', this.state.isDark.toString())
    }

    toggleTheme(){
        this.setState(prevState => {
            localStorage.setItem('isDark', (!prevState.isDark).toString())

            return {
                isDark: !prevState.isDark
            }
        })
    }

    render(){
        return(
            <div 
                className={
                    'fake '+
                    (!this.state.isDark ? 'fakeLight ' : '')
                }
            >
                <Router>
                    <Navbar 
                        isLoggedOut={isLoggedOut()}
                        isDark={this.state.isDark}
                        toggleTheme={this.toggleTheme}
                    />
                    <RouteGenerate 
                        isLoggedOut={isLoggedOut()} 
                        isDark={this.state.isDark}
                    />
                </Router>
            </div>
        )
    }
}

ReactDOM.render(<Main />,document.getElementById('root'))