import * as React from 'react';
import { Component } from 'react';
import '../../style/base/navbar.css'

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
            <div id="navBar"></div>
        )
    }
}