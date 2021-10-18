import * as React from 'react';
import '../../../style/loggedIn/nowPlaying.css'
import {getNowPlaying} from './getNowPlaying'
import {nowPlayingProgress} from './nowPlayingProgress'
import { props, NowPlayingState } from '../types/nowPlayingTypes'

export class NowPlaying extends React.Component<props,NowPlayingState>{
    constructor(props:props){
        super(props)
        this.state = {
            nowPlayingInterval:undefined,
            nowPlayingProgressInterval:undefined,
            isPlaying:false,
            albumArtSrc: '',
            albumArtLinkSrc:'',
            nowPlayingTitle: '',
            nowPlayingTitleLink: '',
            Artists:null,
            nowPlayingProgress:{
                currentMs:null,
                totalMs:null,
                isPlaying:false
            },
            nowPlayingProgressStr:'',
            classNone:'none'
        }
    }

    componentDidMount(){
        this.getNowPlaying()
        this.setState({
            nowPlayingInterval:setInterval(()=>{
                this.getNowPlaying()
            },2000)
        })

        this.nowPlayingProgress()
        this.setState({
            nowPlayingProgressInterval:setInterval(()=>{
                this.nowPlayingProgress()
            },100)
        })
    }

    componentWillUnmount(){
        clearInterval(this.state.nowPlayingInterval)
        clearInterval(this.state.nowPlayingProgressInterval)
    }

    nowPlayingProgress(){
        nowPlayingProgress.bind(this)()
    }

    async getNowPlaying(){
        await getNowPlaying.bind(this)()
    }

    render(){
        return(
            <div id="nowPlaying" className={"nowPlayingHolder "+this.state.classNone+' '+this.props.classNowPlayingMobile}>
                <p id="nowPlayingStatus">
                    {this.state.isPlaying ? 'Now Playing:' : 'Last Played Song:'}
                </p>
                <a id="albumArtHolder" href={this.state.albumArtLinkSrc}>
                    <img id="albumArt" src={this.state.albumArtSrc} />
                </a>
                <div id="nowPlayingInfoHolder">
                    <a id="nowPlayingTitle" href={this.state.nowPlayingTitleLink}>
                        {this.state.nowPlayingTitle}
                    </a>
                    <p id="nowPlayingArtists">
                        {this.state.Artists}
                    </p>
                    <p id="nowPlayingProgress">
                        {this.state.nowPlayingProgressStr}
                    </p>
                </div>
            </div>
        )
    }
}