import * as React from 'react';
import { NowPlaying } from './nowPlaying';
import '../../style/loggedIn/main.css'
import { mobileDesktopStart, mobileDesktopStop } from './mobileDesktop';

export class LoggedInMain extends React.Component{
    constructor(props:any){
        super(props)
    }
    componentDidMount(){
        mobileDesktopStart()
    }
    componentWillUnmount(){
        mobileDesktopStop()
    }
    render(){
        return(
            <NowPlaying />
            //TODO: add recently played, and recaptcha badge
        )
    }
}