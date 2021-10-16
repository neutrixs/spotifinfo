import * as React from 'react';
import '../../style/loggedIn/nowPlaying.css'
import {getToken} from '../base/functions'

type classNone = '' | 'none'
interface NowPlayingState {
    isPlaying:boolean,
    albumArtSrc:string,
    nowPlayingTitle:string,
    nowPlayingTitleLink:string,
    Artists:any, //idk what react's element type is, so will put this temporarily
    nowPlayingInterval: any,
    nowPlayingProgress: string,
    classNone:classNone
}

export class NowPlaying extends React.Component<{},NowPlayingState>{
    constructor(props:any){
        super(props)
        this.state = {
            nowPlayingInterval:undefined,
            isPlaying:false,
            albumArtSrc: '',
            nowPlayingTitle: '',
            nowPlayingTitleLink: '',
            Artists:null,
            nowPlayingProgress:'',
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
    }

    componentWillUnmount(){
        console.log(this.state)
        clearInterval(this.state.nowPlayingInterval)
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

        if(nowPlayingData.item.name !== this.state.nowPlayingTitle){
            //TODO: call get recently played here
        }

        this.setState({
            nowPlayingTitle:nowPlayingData.item.name,
            nowPlayingTitleLink:nowPlayingData.item.external_urls.spotify
        })

        //TODO: add now playing progress

        this.setState({
            classNone:''
        })
    }

    render(){
        return(
            <div id="nowPlaying" className={"nowPlaying "+this.state.classNone}>
                <p id="nowPlayingStatus">
                    {this.state.isPlaying ? 'Now Playing:' : 'Last Played Song:'}
                </p>
                <a id="albumArtHolder">
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
                        {this.state.nowPlayingProgress}
                    </p>
                </div>
            </div>
        )
    }
}