import * as React from 'react';
import '../../style/loggedIn/nowPlaying.css'

export class LoggedInPage extends React.Component{
    constructor(props:any){
        super(props)
    }

    render(){
        return(
            <div id="nowPlaying" className="nowPlaying none">

            </div>
        )
    }
}