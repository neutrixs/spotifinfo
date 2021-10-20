import * as React from 'react';
import TopTracks from './topTracks'
import {getToken} from '../../base/functions'
import {spotifyTopTracks, artist} from '../types/spotifyTop'
export default async function getTopTracks(this:TopTracks){
    const listRanges = ['long_term','medium_term','short_term']
    const currentRange = listRanges[this.props.Range]

    const res = await fetch('https://api.spotify.com/v1/me/top/artists?limit=50&time_range='+currentRange,{
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

    constructedData.push(
        <div></div>
    )

    this.setState({
        data: constructedData
    })
}