import * as React from 'react';
import { NowPlaying } from './nowPlaying';
import '../../style/loggedIn/main.css'

export class LoggedInMain extends React.Component{
    constructor(props:any){
        super(props)
    }
    componentDidMount(){
    }
    componentWillUnmount(){
    }
    render(){
        return(
            <div id="page">
                <NowPlaying />
            </div>
            //TODO: add recently played, and recaptcha badge
        )
    }
}