import {getToken} from '../../base/functions'
import * as React from 'react';
async function getNowPlaying(this1:any){
    const res = await fetch('https://api.spotify.com/v1/me/player/currently-playing',{
        method:'GET',
        headers:{
            'authorization': window.localStorage['token']
        }
    })

    if(res.status == 204){
        this1.setState({
            classNone:'none'
        })
        return
    }

    const nowPlayingData = await res.json()

    if(nowPlayingData.error){
        if(nowPlayingData.error.status == 400 || nowPlayingData.error.status == 401){
            clearInterval(this1.state.nowPlayingInterval)
            await getToken()
            this1.getNowPlaying()
            this1.setState({
                nowPlayingInterval:setInterval(()=>{
                    this1.getNowPlaying()
                },2000)
            })
        }
        return
    }

    if(!nowPlayingData.item){
        this1.setState({
            classNone:'none'
        })
        return
    }

    if(nowPlayingData.is_playing){
        this1.setState({
            isPlaying:true
        })
    }
    else{
        this1.setState({
            isPlaying:false
        })
    }

    if(nowPlayingData.item.name !== this1.state.nowPlayingTitle){
        this1.props.getRecentlyPlayed()
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

    this1.setState({
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

    this1.setState({
        classNone:''
    })
}

export { getNowPlaying }