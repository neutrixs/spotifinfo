import * as React from 'react'

import getToken from '../../other/getToken'

import spotifyPlaybackState from '../../types/spotifyPlaybackState'

import { setCurrentMs, setTotalMs, setIsPlaying as updateProgressSetIsPlaying } from './updateProgress'

import { paletteType } from './nowPlaying'
interface props {
    // lmao

    setArtURL: React.Dispatch<React.SetStateAction<string>>
    setSongURL: React.Dispatch<React.SetStateAction<string>>
    setArtists: React.Dispatch<React.SetStateAction<JSX.Element[]>>
    setAlbumURL: React.Dispatch<React.SetStateAction<string>>
    setProgress: React.Dispatch<React.SetStateAction<string>>
    setSongTitle: React.Dispatch<React.SetStateAction<string>>
    setShowNowPlaying: React.Dispatch<React.SetStateAction<boolean>>
    setPalette: React.Dispatch<React.SetStateAction<paletteType>>
    setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>

    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export default async function getNowPlaying(thisProps: props) {
    if (localStorage.getItem('noNPFetch') == 'true') {
        document.title = 'noNPFetch IS ENABLED!'
        return
    }

    const token = localStorage.getItem('token')

    if (!token) {
        await getToken()
        getNowPlaying(thisProps)
        return
    }

    const rawResponse = await fetch('https://api.spotify.com/v1/me/player', {
        method: 'GET',
        headers: {
            Authorization: token,
        },
    })

    const statusCode = rawResponse.status

    if (statusCode == 204) {
        thisProps.setShowNowPlaying(false)
        return
    }

    if (statusCode == 400 || statusCode == 401 || statusCode == 403) {
        await getToken()
        getNowPlaying(thisProps)
        return
    }

    thisProps.setShowNowPlaying(true)

    const data = (await rawResponse.json()) as spotifyPlaybackState

    thisProps.setArtURL(data.item.album.images[0].url)
    thisProps.setAlbumURL(data.item.album.external_urls.spotify)
    thisProps.setSongTitle(data.item.name)
    thisProps.setSongURL(data.item.external_urls.spotify)

    parseArtists(data, thisProps.setArtists)

    thisProps.setIsPlaying(data.is_playing)
    thisProps.setIsLoading(false)

    updateProgressSetIsPlaying(data.is_playing)
    setCurrentMs(data.progress_ms)
    setTotalMs(data.item.duration_ms)
}

function parseArtists(data: spotifyPlaybackState, setArtists: props['setArtists']) {
    const dataToAdd: JSX.Element[] = []
    const artists = data.item.artists

    for (let i = 0; i < artists.length; i++) {
        dataToAdd.push(
            <span key={`npartist${i}.${artists[i].id}`}>
                <a href={artists[i].external_urls.spotify}>{artists[i].name}</a>
                {i != artists.length - 1 ? <span>, </span> : null}
            </span>
        )
    }

    setArtists(dataToAdd)
}
