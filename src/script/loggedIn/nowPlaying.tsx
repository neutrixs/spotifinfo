import * as React from 'react';
import '../../style/loggedIn/nowPlaying.css'

type nowPlayingInterval = typeof setInterval;
interface NowPlayingState {
    isPlaying:boolean,
    albumArtSrc:string,
    nowPlayingTitle:string,
    Artists:any, //idk what react's element type is, so will put this temporarily
    nowPlayingInterval: nowPlayingInterval | undefined,
    nowPlayingProgress: string
}

export class NowPlaying extends React.Component<{},NowPlayingState>{
    constructor(props:any){
        super(props)
        this.state = {
            nowPlayingInterval:undefined,
            isPlaying:false,
            albumArtSrc: '',
            nowPlayingTitle: '',
            Artists:null,
            nowPlayingProgress:''
        }
    }

    

    render(){
        return(
            <div id="nowPlaying" className="nowPlaying none">
                <p id="nowPlayingStatus">
                    {this.state.isPlaying ? 'Now Playing:' : 'Last Played Song:'}
                </p>
                <a id="albumArtHolder">
                    <img id="albumArt" src={this.state.albumArtSrc} />
                </a>
                <div id="nowPlayingInfoHolder">
                    <a id="nowPlayingTitle">
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