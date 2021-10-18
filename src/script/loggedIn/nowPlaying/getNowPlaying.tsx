import {getToken} from '../../base/functions'
import * as React from 'react';
import { spotifyCurrentlyPlayingType } from '../types/spotifyCurrentlyPlaying'
import {NowPlaying} from './nowPlaying'
async function getNowPlaying(this:NowPlaying){
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

    if(res.status == 400 || res.status == 401){
        clearInterval(this.state.nowPlayingInterval)
        await getToken()
        this.getNowPlaying()
        this.setState({
            nowPlayingInterval:setInterval(()=>{
                this.getNowPlaying()
            },2000)
        })
        return
    }

    const nowPlayingData:spotifyCurrentlyPlayingType = await res.json()

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
        if(this.state.nowPlayingTitle) this.props.getRecentlyPlayed()
    }

    let artists = []
    for(let i=0; i< nowPlayingData.item.artists.length; i++){
        let thisArtist = nowPlayingData.item.artists[i]
        artists.push(
            <span key={thisArtist.id+'_hold'}>
                <a key={thisArtist.id} id={"nowPlayingArtists"+i.toString()} href={thisArtist.external_urls.spotify}>{thisArtist.name}</a>
                {i !== nowPlayingData.item.artists.length-1 ? <span key={thisArtist.id+'_comma'}>, </span>: null}
            </span>
        )
    }

    this.setState({
        nowPlayingTitle:nowPlayingData.item.name,
        nowPlayingTitleLink:nowPlayingData.item.external_urls.spotify,
        albumArtSrc:nowPlayingData.item.album.images[0].url,
        albumArtLinkSrc:nowPlayingData.item.album.external_urls.spotify,
        Artists:artists,
        nowPlayingProgress:{
            currentMs:nowPlayingData.progress_ms,
            totalMs:nowPlayingData.item.duration_ms,
            isPlaying:nowPlayingData.is_playing
        }
    })

    this.setState({
        classNone:''
    })
}

export { getNowPlaying }