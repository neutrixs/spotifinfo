import * as React from 'react';
import '../../../style/loggedIn/nowPlaying.css'
import {getNowPlaying} from './getNowPlaying'
import {nowPlayingProgress} from './nowPlayingProgress'
import { props, NowPlayingState } from '../types/nowPlayingTypes'
import {listener as sideTextListener} from './nowPlayingSideText'
import {colour} from './colour'

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
            classNone:'none',
            nowPlayingInfoHolderSide:'nowPlayingInfoHolderSide',
            palette:undefined
        }
    }

    _sideTextListener = sideTextListener.bind(this)
    _colour = colour.bind(this)

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

        window.addEventListener('resize',this._sideTextListener)
        sideTextListener.bind(this)()

        const img = document.getElementById('albumArt') as HTMLImageElement
        img.crossOrigin = 'anonymous'
        img.addEventListener('load',this._colour)
    }

    componentWillUnmount(){
        clearInterval(this.state.nowPlayingInterval)
        clearInterval(this.state.nowPlayingProgressInterval)

        window.removeEventListener('resize',this._sideTextListener)
        const img = document.getElementById('albumArt') as HTMLImageElement
        img.removeEventListener('load',this._colour)
    }

    nowPlayingProgress(){
        nowPlayingProgress.bind(this)()
    }

    async getNowPlaying(){
        await getNowPlaying.bind(this)()
    }

    setPalette(){
        if(!this.state.palette) return ''

        const colour = this.state.palette[0].join(',')
        return 'rgb('+colour+')'
    }

    render(){
        return(
            <div id="nowPlaying" 
                className={"nowPlayingHolder "+this.state.classNone+' '+this.props.classNowPlayingMobile}
                style={{
                    backgroundColor: this.setPalette()
                }}
            >
                <p id="nowPlayingStatus">
                    {this.state.isPlaying ? 'Now Playing:' : 'Last Played Song:'}
                </p>
                <a id="albumArtHolder" href={this.state.albumArtLinkSrc}>
                    <img id="albumArt" src={this.state.albumArtSrc} />
                </a>
                <div id="nowPlayingInfoHolder" className={this.state.nowPlayingInfoHolderSide}>
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