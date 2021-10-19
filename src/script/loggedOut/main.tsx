import * as React from 'react';
import '../../style/loggedOut/main.css'

interface states {
    isMobile:boolean
    pageNone:boolean
    transitionOn:boolean
}

export class LoggedOutMain extends React.Component<{},states> {
    constructor(props:{}){
        super(props)
        this.state = {
            isMobile:false,
            pageNone:true,
            transitionOn:false
        }
        this.mobileListener = this.mobileListener.bind(this)
    }

    componentDidMount(){
        this.mobileListenerStart()
    }

    componentWillUnmount(){
        window.removeEventListener('resize',this.mobileListener)
    }

    mobileListener(){
        const changeAt = 66
        const windowFontSize = parseFloat(window.getComputedStyle(document.body).getPropertyValue('font-size'))
        const isMobile = window.innerWidth / windowFontSize < changeAt

        this.setState({
            isMobile:isMobile
        })
    }

    mobileListenerStart(){
        this.mobileListener()
        this.setState({
            pageNone:false,
            transitionOn:true
        })

        window.addEventListener('resize',this.mobileListener)
    }

    render(){
        return(
            <div
                id="page"
                className={
                    (this.state.pageNone ? 'none ' : '')+
                    (this.state.isMobile ? 'pageMobile ' : '')+
                    (this.state.transitionOn ? 'transition300ms ' : '')
                }
            >
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