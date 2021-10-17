import * as React from 'react';
import { NowPlaying } from './nowPlaying/nowPlaying';
import '../../style/loggedIn/main.css'
import { ReCaptchaBadge } from '../base/reCaptchaBadge'
import { RecentlyPlayed } from './recentlyPlayed/recentlyPlayed'

interface states{
    additionalPageStyle:string,
    pageStyleTransition:string,
    classNowPlayingMobile:''|'nowPlayingHolderMobile',
    getRecentlyPlayed:Function
}

export class LoggedInMain extends React.Component<{},states>{
    constructor(props:any){
        super(props)
        this.state = {
            additionalPageStyle: '',
            pageStyleTransition: '',
            classNowPlayingMobile: '',
            getRecentlyPlayed:function(){}
        }

        this.setGetRecentlyPlayedFunction = this.setGetRecentlyPlayedFunction.bind(this)
    }
    componentDidMount(){
        this.mobileListenerFirst(this)
    }
    componentWillUnmount(){
        window.removeEventListener('resize',()=>{this.mobileListener(this)})
    }

    setGetRecentlyPlayedFunction(func:Function){
        this.setState({
            getRecentlyPlayed:func
        })
    }

    mobileListener(this1:any){
        const changeAt = 44.5
        const windowFontSize = parseFloat(window.getComputedStyle(document.body).getPropertyValue('font-size'))
        const isMobile = window.innerWidth / windowFontSize < changeAt

        this1.setState({
            additionalPageStyle: isMobile ? 'pageMobile' : '',
            classNowPlayingMobile: isMobile ? 'nowPlayingHolderMobile' : ''
        })
    }

    mobileListenerFirst(this1:any){
        this.setState({
            pageStyleTransition: 'transition300ms'
        })

        this.mobileListener(this)
        window.addEventListener('resize',()=>{this1.mobileListener(this1)})
    }

    render(){
        const classNowPlayingMobile = this.state.classNowPlayingMobile
        return(
            <div id="page" className={this.state.pageStyleTransition+' '+this.state.additionalPageStyle}>
                <NowPlaying getRecentlyPlayed={this.state.getRecentlyPlayed} classNowPlayingMobile={classNowPlayingMobile} />
                <RecentlyPlayed setGetRecentlyPlayedFunction={this.setGetRecentlyPlayedFunction} />
                <ReCaptchaBadge />
            </div>
        )
    }
}