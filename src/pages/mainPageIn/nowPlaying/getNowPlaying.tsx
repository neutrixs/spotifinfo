import * as React from 'react'

import getToken from '../../other/getToken'

import { nowPlayingStatus } from './nowPlaying'

interface props {
    // lmao

    setArtURL: React.Dispatch<React.SetStateAction<string>>
    setSongURL: React.Dispatch<React.SetStateAction<string>>
    setArtists: React.Dispatch<React.SetStateAction<JSX.Element[]>>
    setAlbumURL: React.Dispatch<React.SetStateAction<string>>
    setProgress: React.Dispatch<React.SetStateAction<string>>
    setSongTitle: React.Dispatch<React.SetStateAction<string>>
    setShowNowPlaying: React.Dispatch<React.SetStateAction<boolean>>
    setBackgroundColour: React.Dispatch<React.SetStateAction<string>>
    setNowPlayingStatus: React.Dispatch<React.SetStateAction<nowPlayingStatus>>
}

export default async function getNowPlaying(thisProps: props) {
    const token = localStorage.getItem('token')

    if(!token){
        await getToken()
        getNowPlaying(thisProps)
        return
    }

    const rawResponse = await fetch('https://api.spotify.com/v1/me/player')
}
