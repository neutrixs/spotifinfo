import * as React from 'react'

import getToken from '../../other/getToken'

import spotifyPlaybackState from '../../types/spotifyPlaybackState'

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
    setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>
}

export default async function getNowPlaying(thisProps: props) {
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

    const data = (await rawResponse.json()) as spotifyPlaybackState

    thisProps.setArtURL(data.item.album.images[0].url)
    thisProps.setAlbumURL(data.item.album.external_urls.spotify)
    thisProps.setSongTitle(data.item.name)
    thisProps.setSongURL(data.item.external_urls.spotify)

    parseArtists(data, thisProps.setArtists)

    thisProps.setIsPlaying(data.is_playing)
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
