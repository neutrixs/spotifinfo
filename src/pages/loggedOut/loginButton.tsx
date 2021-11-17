import * as React from 'react';
import '../../style/loggedOut/loginNavbar.scss'
import * as spotifyLogo from '../../img/spotify_logo.png'
import * as spotifyLogoForLight from '../../img/Spotify_Icon_RGB_Black.png'

interface props{
    isDark:boolean
    login:()=>string
}

export default class Loginbutton extends React.Component<props>{
    constructor(props:props){
        super(props)
    }

    render(){
        return(
            <a id="loginHolder" href={this.props.login()}>
            <img 
                src={(this.props.isDark ? spotifyLogo : spotifyLogoForLight)} 
            />
            <span 
                style={{
                    lineHeight:'1em',
                    verticalAlign:'middle'
                }}
            >Login</span>
        </a>
        )
    }
}