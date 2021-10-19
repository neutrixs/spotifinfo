import * as React from 'react';
import '../../style/loggedOut/main.css'

export class LoggedOutMain extends React.Component {
    constructor(props:{}){
        super(props)
    }

    render(){
        return(
            <div id="page">
                <div id="loggedOutHolder">
                    <div id="kingHolder">
                        <img id="king" src="/img/kinghd.png" />
                    </div>
                    <div id="infoHolder">
                        <p id="title">Spotifinfo</p>
                        <p id="subTitle">What you can do with this:</p>
                        <ul id="listYouCanDo">
                            <li>See your now playing</li>
                            <li>See your listening history</li>
                            <li>See your top tracks and artists</li>
                            <li>Info about your Spotify account</li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}