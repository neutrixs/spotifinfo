import * as React from 'react';
import { Component } from 'react';
import '../../style/base/navbar.css'
import { Route, Switch, BrowserRouter as Router, NavLink } from 'react-router-dom'

interface navbarParam {
    isLoggedOut:boolean
}

export class Navbar extends Component<navbarParam> {
    constructor(props:any) {
        super(props)
    }

    topTracksRouter(){
        if(!this.props.isLoggedOut){
            return(
                <NavLink to="/top_tracks">
                        <span className="pages lineHeight1">Top Tracks/Artists</span>
                </NavLink>
            )
        }
        return null
    }

    dropdown(){
        if(!this.props.isLoggedOut){
            return(
                <>
                    <div id="profile_holder">
                        <img id="profile" />
                        <svg id="dropdown" viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg"><g><path fill="white" d="m121.3,34.6c-1.6-1.6-4.2-1.6-5.8,0l-51,51.1-51.1-51.1c-1.6-1.6-4.2-1.6-5.8,0-1.6,1.6-1.6,4.2 0,5.8l53.9,53.9c0.8,0.8 1.8,1.2 2.9,1.2 1,0 2.1-0.4 2.9-1.2l53.9-53.9c1.7-1.6 1.7-4.2 0.1-5.8z"></path></g></svg>
                    </div>

                    <div id="dropdown_options" className="dropdown_options none">
                        <NavLink to="/account">
                            <span className="pointer">Account</span>
                        </NavLink>
                        <div className="divider1"></div>
                        <a id="logout" className="pointer">Logout</a>
                        <div className="divider1"></div>
                        <div id="theme" className="pointer">
                            <span>Dark mode</span>
                            <svg id="theme_check" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" fill="white"/></svg>
                        </div>
                    </div>
                </>
            )
        }
        else{
            return null
        }
    }

    render(){
        console.log(this.props)
        return(
            <div id="navBar" className="nav">
                <Router>
                    <NavLink to="/">
                        <span className="pages lineHeight1" style={{marginLeft:'1.5em'}}>Home</span>
                    </NavLink>
                    {this.topTracksRouter()}
                    {this.dropdown()}
                </Router>
            </div>
        )
    }
}