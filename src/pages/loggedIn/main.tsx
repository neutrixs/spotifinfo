import * as React from 'react';
import { NowPlaying } from '../../script/loggedIn/nowPlaying/nowPlaying';
import './main.scss'
import { ReCaptchaBadge } from '../base/reCaptchaBadge'
import { RecentlyPlayed } from '../../script/loggedIn/recentlyPlayed/recentlyPlayed'

interface states{
    additionalPageStyle:string,
    pageStyleTransition:string,
    classNowPlayingMobile:boolean,
    pageClassNone:''|'none',
    getRecentlyPlayed:Function
}

interface props{
    isDark:boolean
}

export default class LoggedInMain extends React.Component<props,states>{
    constructor(props:props){
        super(props)
        this.state = {
            additionalPageStyle: '',
            pageStyleTransition: '',
            classNowPlayingMobile: false,
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
            classNowPlayingMobile: isMobile ? true : false
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
                <NowPlaying 
                    getRecentlyPlayed={this.state.getRecentlyPlayed} 
                    classNowPlayingMobile={classNowPlayingMobile} 
                    isDark={this.props.isDark}
                />
                <RecentlyPlayed setGetRecentlyPlayedFunction={this.setGetRecentlyPlayedFunction} />
                <ReCaptchaBadge isDark={this.props.isDark} />
            </div>
        )
    }
}