import * as React from 'react';
import TopTracks from './topTracks'
import {getToken} from '../../base/functions'
import {spotifyTopTracks, artist} from '../types/spotifyTop'
export default async function getTopTracks(this:TopTracks){
    const listRanges = ['long_term','medium_term','short_term']
    const currentRange = listRanges[this.props.Range]

    const res = await fetch('https://api.spotify.com/v1/me/top/tracks?limit=50&time_range='+currentRange,{
        method: 'GET',
        headers:{
            'Authorization':window.localStorage['token']
        }
    })

    if(res.status == 400 || res.status == 401){
        await getToken()
        getTopTracks.bind(this)()
        return
    }

    const data:spotifyTopTracks = await res.json()
    let constructedData = []

    for(let i=0;i<data.items.length;i++){
        let currentTrack = data.items[i]
        let key = currentTrack.id+'_'+i.toString()+'_'
        constructedData.push(
            <div key={key+'0'} className="trackEach">
                <div key={key+'1'} className="listNumber">
                    <span key={key+'2'}> {(i+1).toString()} </span>
                </div>
                <a key={key+'3'} className="listArtHolder" href={currentTrack.album.external_urls.spotify}>
                    <img key={key+'4'} src={currentTrack.album.images[1].url} className="listArt" />
                </a>
            </div>
        )
    }

    this.setState({
        data: constructedData
    })
}