import * as React from 'react';
import {Navbar} from '../base/navbar'
import '../../style/loggedOut/loginNavbar.css'
import * as spotifyLogo from '../../img/spotify_logo.png'

export default function loginButton(this:Navbar):JSX.Element{
    return (
        <a id="loginHolder" href={this.login()}>
            <img id="spotifyLogo" src={spotifyLogo} />
            <span 
                style={{
                    lineHeight:'1em',
                    verticalAlign:'middle'
                }}
            >Login</span>
        </a>
    )
}