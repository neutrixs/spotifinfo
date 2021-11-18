import * as React from 'react';
import './nowPlaying.scss'
import {getNowPlaying} from './modules/getNowPlaying'
import {nowPlayingProgress} from './modules/nowPlayingProgress'
import { props, NowPlayingState } from '../types/nowPlayingTypes'
import {listener as sideTextListener} from './modules/nowPlayingSideText'
import {colour} from './modules/colour__obfu'

const nowPlayingTimeoutDuration = 600000 // because rip my api key if i don't do this

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
            classNone:true,
            nowPlayingInfoHolderSide:true,
            palette:undefined
        }
    }

    _sideTextListener = sideTextListener.bind(this)
    _colour = colour.bind(this)
    _timeout = setTimeout(this.stopNowPlayingInterval.bind(this),nowPlayingTimeoutDuration)

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
        setTimeout(sideTextListener.bind(this),10)

        const img = document.getElementById('albumArt') as HTMLImageElement
        img.crossOrigin = 'anonymous'
        img.addEventListener('load',this._colour)
    }

    componentWillUnmount(){
        this.stopNowPlayingInterval()
        clearTimeout(this._timeout)

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

    stopNowPlayingInterval(){
        clearInterval(this.state.nowPlayingInterval)
        clearInterval(this.state.nowPlayingProgressInterval)
    }

    setPalette(dark:boolean):string{
        if(!this.state.palette) return ''

        const colour = this.state.palette[dark ? 0 : 1].join(',')
        return 'rgb('+colour+')'
    }

    render(){
        return(
            <div id="nowPlaying" 
                className={
                    "nowPlayingHolder "+
                    (this.state.classNone ? 'none ' : '')+
                    (this.props.classNowPlayingMobile ? 'nowPlayingHolderMobile ': '')
                }
                style={{
                    backgroundColor: this.setPalette(this.props.isDark)
                }}
            >
                <p id="status">
                    {this.state.isPlaying ? 'Now Playing:' : 'Last Played Song:'}
                </p>
                <a id="albumArtHolder" href={this.state.albumArtLinkSrc}>
                    <img id="albumArt" src={this.state.albumArtSrc} />
                </a>
                <div 
                    className={
                        'infoHolder '+
                        (this.state.nowPlayingInfoHolderSide ? 'infoHolderSide ' : '')
                    }
                >
                    <a id="title" href={this.state.nowPlayingTitleLink}>
                        {this.state.nowPlayingTitle}
                    </a>
                    <p id="artists">
                        {this.state.Artists}
                    </p>
                    <p id="progress">
                        {this.state.nowPlayingProgressStr}
                    </p>
                </div>
            </div>
        )
    }
}