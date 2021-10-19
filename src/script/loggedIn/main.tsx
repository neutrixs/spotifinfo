import * as React from 'react';
import { NowPlaying } from './nowPlaying/nowPlaying';
import '../../style/loggedIn/main.css'
import { ReCaptchaBadge } from '../base/reCaptchaBadge'
import { RecentlyPlayed } from './recentlyPlayed/recentlyPlayed'

interface states{
    additionalPageStyle:string,
    pageStyleTransition:string,
    classNowPlayingMobile:''|'nowPlayingHolderMobile',
    pageClassNone:''|'none',
    getRecentlyPlayed:Function
}

export default class LoggedInMain extends React.Component<{},states>{
    constructor(props:any){
        super(props)
        this.state = {
            additionalPageStyle: '',
            pageStyleTransition: '',
            classNowPlayingMobile: '',
            pageClassNone:'none',
            getRecentlyPlayed:function(){}
        }

        this.setGetRecentlyPlayedFunction = this.setGetRecentlyPlayedFunction.bind(this)
        this.mobileListener = this.mobileListener.bind(this)
    }
    componentDidMount(){
        this.mobileListenerFirst()
    }
    componentWillUnmount(){
        window.removeEventListener('resize',this.mobileListener)
    }

    setGetRecentlyPlayedFunction(func:Function){
        this.setState({
            getRecentlyPlayed:func
        })
    }

    mobileListener(this:this){
        const changeAt = 66
        const windowFontSize = parseFloat(window.getComputedStyle(document.body).getPropertyValue('font-size'))
        const isMobile = window.innerWidth / windowFontSize < changeAt

        this.setState({
            additionalPageStyle: isMobile ? 'pageMobile' : '',
            classNowPlayingMobile: isMobile ? 'nowPlayingHolderMobile' : ''
        })
    }

    mobileListenerFirst(){
        this.mobileListener()
        this.setState({
            pageClassNone:'',
            pageStyleTransition:'transition300ms'
        })

        window.addEventListener('resize',this.mobileListener)
    }

    render(){
        const classNowPlayingMobile = this.state.classNowPlayingMobile
        return(
            <div id="page" className={this.state.pageStyleTransition+' '+this.state.additionalPageStyle+' '+this.state.pageClassNone}>
                <NowPlaying getRecentlyPlayed={this.state.getRecentlyPlayed} classNowPlayingMobile={classNowPlayingMobile} />
                <RecentlyPlayed setGetRecentlyPlayedFunction={this.setGetRecentlyPlayedFunction} />
                <ReCaptchaBadge />
            </div>
        )
    }
}