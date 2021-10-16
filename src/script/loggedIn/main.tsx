import * as React from 'react';
import { NowPlaying } from './nowPlaying';
import '../../style/loggedIn/main.css'

interface states{
    additionalPageStyle:string,
    pageStyleTransition:string,
    mobileListenerFunction:Function|null
}

export class LoggedInMain extends React.Component<{},states>{
    constructor(props:any){
        super(props)
        this.state = {
            additionalPageStyle: '',
            pageStyleTransition: '',
            mobileListenerFunction: null
        }
    }
    componentDidMount(){
        const changeAt = 44.5
        const windowFontSize = parseFloat(window.getComputedStyle(document.body).getPropertyValue('font-size'))
        const isMobile = window.innerWidth / windowFontSize < changeAt

        if(isMobile){
            this.setState({
                additionalPageStyle: 'pageMobile'
            })
        }
        this.setState({
            pageStyleTransition: 'transition300ms'
        })

        this.mobileListener(this)
        window.addEventListener('resize',()=>{this.mobileListener(this)})
    }
    componentWillUnmount(){
        window.removeEventListener('resize',()=>{this.mobileListener(this)})
    }

    mobileListener(this1:any){
        const changeAt = 44.5
        const windowFontSize = parseFloat(window.getComputedStyle(document.body).getPropertyValue('font-size'))
        const isMobile = window.innerWidth / windowFontSize < changeAt

        this1.setState({
            additionalPageStyle: isMobile ? 'pageMobile' : ''
        })
    }

    mobileListenerFirst(this1:any){

    }

    render(){
        return(
            <div id="page" className={this.state.pageStyleTransition+' '+this.state.additionalPageStyle}>
                <NowPlaying />
            </div>
            //TODO: add recently played, and recaptcha badge
        )
    }
}