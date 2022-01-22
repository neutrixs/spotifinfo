import * as React from 'react'

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

export default function getNowPlaying(thisProps: props) {}
