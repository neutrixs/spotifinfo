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
    render(){
        console.log(this.props)
        return(
            <div id="navBar" className="nav">
                <Router>
                    <NavLink to="/">
                        <span className="page page_lft lh1">Home</span>
                    </NavLink>
                {!this.props.isLoggedOut ? 
                    <NavLink to="/top_tracks">
                        <span className="page lh1">Top Tracks/Artists</span>
                    </NavLink>
                :null}
                </Router>
            </div>
        )
    }
}