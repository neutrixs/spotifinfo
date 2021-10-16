import * as React from 'react';
import { NowPlaying } from './nowPlaying/nowPlaying';
import '../../style/loggedIn/main.css'

interface states{
    additionalPageStyle:string,
    pageStyleTransition:string,
    classNowPlayingMobile:''|'nowPlayingHolderMobile'
}

export class LoggedInMain extends React.Component<{},states>{
    constructor(props:any){
        super(props)
        this.state = {
            additionalPageStyle: '',
            pageStyleTransition: '',
            classNowPlayingMobile: ''
        }
    }
    componentDidMount(){
        this.mobileListenerFirst(this)
    }
    componentWillUnmount(){
        window.removeEventListener('resize',()=>{this.mobileListener(this)})
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
                <NowPlaying classNowPlayingMobile={classNowPlayingMobile} />
            </div>
            //TODO: add recently played, and recaptcha badge
        )
    }
}