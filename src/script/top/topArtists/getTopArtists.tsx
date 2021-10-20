import * as React from 'react';
import TopArtists from './topArtists'
import {spotifyTopArtists, artistFull} from '../types/spotifyTop'
import {getToken} from '../../base/functions'

export default async function getTopArtists(this:TopArtists){
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
        getTopArtists.bind(this)()
        return
    }

    const data:spotifyTopArtists = await res.json()
    let constructedData = []

    for(let i=0; i<data.items.length; i++){
        let thisArtist = data.items[i]
        let key = thisArtist.id+'_'+i.toString()+'_'

        constructedData.push(
            <div key={key+'0'} className="artistEach">
                <div key={key+'1'} className="listArtistNumber">
                    <span key={key+'2'}>{(i+1).toString()}</span>
                </div>
            </div>
        )
    }

    this.setState({
        data:constructedData
    })
}