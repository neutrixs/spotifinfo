import * as React from 'react';
import '../../style/loggedIn/nowPlaying.css'
import {getToken} from '../base/functions'

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

export class NowPlaying extends React.Component<{},NowPlayingState>{
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
        console.log('wtf')
        if(!this.state.nowPlayingProgress.isPlaying) return

        this.setState((state)=>({
            nowPlayingProgress:{
                currentMs: state.nowPlayingProgress.currentMs+100,
                totalMs: state.nowPlayingProgress.totalMs,
                isPlaying: state.nowPlayingProgress.isPlaying
            }
        }))

        const current = this.state.nowPlayingProgress.currentMs
        const total = this.state.nowPlayingProgress.totalMs

        let currentMinute = Math.floor(current/60000).toString()
        let currentSecond:string|number = (Math.floor(current/1000) % 60)
        currentSecond = (currentSecond < 10 ? '0' : '')+currentSecond.toString()

        let totalMinute = Math.floor(total/60000).toString()
        let totalSecond:string|number = (Math.floor(total/1000) % 60)
        totalSecond = (total < 10 ? '0' : '')+totalSecond.toString

        let stringRes = currentMinute+':'+currentSecond+' / '+totalMinute+':'+totalSecond

        this.setState({
            nowPlayingProgressStr:stringRes
        })
    }

    async getNowPlaying(){
        const res = await fetch('https://api.spotify.com/v1/me/player/currently-playing',{
            method:'GET',
            headers:{
                'authorization': window.localStorage['token']
            }
        })

        if(res.status == 204){
            this.setState({
                classNone:'none'
            })
            return
        }

        const nowPlayingData = await res.json()

        if(nowPlayingData.error){
            if(nowPlayingData.error.status == 400 || nowPlayingData.error.status == 401){
                clearInterval(this.state.nowPlayingInterval)
                await getToken()
                this.getNowPlaying()
                this.setState({
                    nowPlayingInterval:setInterval(()=>{
                        this.getNowPlaying()
                    },2000)
                })
            }
            return
        }

        if(!nowPlayingData.item){
            this.setState({
                classNone:'none'
            })
            return
        }

        if(nowPlayingData.is_playing){
            this.setState({
                isPlaying:true
            })
        }
        else{
            this.setState({
                isPlaying:false
            })
        }

        if(nowPlayingData.item.name !== this.state.nowPlayingTitle){
            //TODO: call get recently played here
        }

        let artists = []
        for(let i=0; i< nowPlayingData.item.artists.length; i++){
            let thisArtist = nowPlayingData.item.artists[i]
            artists.push(
                <>
                    <a id={"nowPlayingArtists"+i.toString()} href={thisArtist.external_urls.spotify}>{thisArtist.name}</a>
                    {i !== nowPlayingData.item.artists.length-1 ? <span>, </span>: null}
                </>
            )
        }

        this.setState({
            nowPlayingTitle:nowPlayingData.item.name,
            nowPlayingTitleLink:nowPlayingData.item.external_urls.spotify,
            albumArtSrc:nowPlayingData.item.album.images[0].url,
            albumArtLinkSrc:nowPlayingData.item.album.external_urls.spotify,
            Artists:artists
        })

        //TODO: add now playing progress

        this.setState({
            classNone:''
        })
    }

    render(){
        return(
            <div id="nowPlaying" className={"nowPlayingHolder "+this.state.classNone}>
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