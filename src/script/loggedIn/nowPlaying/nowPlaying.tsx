import * as React from 'react';
import '../../../style/loggedIn/nowPlaying.css'
import {getNowPlaying} from './getNowPlaying'
import {nowPlayingProgress} from './nowPlayingProgress'

type classNone = '' | 'none'
interface progress{
    currentMs: number|null,
    totalMs: number|null,
    isPlaying: boolean
}
interface NowPlayingState {
    isPlaying:boolean,
    albumArtSrc:string,
    albumArtLinkSrc:string,
    nowPlayingTitle:string,
    nowPlayingTitleLink:string,
    Artists:any, //idk what react's element type is, so will put this temporarily
    nowPlayingInterval: any,
    nowPlayingProgressInterval:any,
    nowPlayingProgress: progress,
    nowPlayingProgressStr: string,
    classNone:classNone
}

interface props{
    classNowPlayingMobile:''|'nowPlayingHolderMobile'
}

export class NowPlaying extends React.Component<props,NowPlayingState>{
    constructor(props:any){
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
        console.log(this.state)
        clearInterval(this.state.nowPlayingInterval)
        clearInterval(this.state.nowPlayingProgressInterval)
    }

    nowPlayingProgress(){
        nowPlayingProgress(this)
    }

    async getNowPlaying(){
        await getNowPlaying(this)
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