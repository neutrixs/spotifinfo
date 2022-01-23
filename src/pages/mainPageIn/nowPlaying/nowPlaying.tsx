import * as React from 'react'
import { useState, useEffect } from 'react'

import { sideTextDetectBoolean, sideTextDetect } from './sideText'

import getNowPlaying from './getNowPlaying'

import updateProgress from './updateProgress'

import './nowPlaying.scss'

interface props {
    isDark: boolean
    isMobile: boolean
}

type paletteType = [[number, number, number, number?], [number, number, number, number?]]

export default function NowPlaying({ isDark, isMobile }: props) {
    const [artURL, setArtURL] = useState<string>('')
    const [songURL, setSongURL] = useState<string>('')
    const [artists, setArtists] = useState<JSX.Element[]>([])
    const [albumURL, setAlbumURL] = useState<string>('')
    const [progress, setProgress] = useState<string>('')
    const [sideText, setSideText] = useState<boolean>(sideTextDetectBoolean(isMobile))
    const [isPlaying, setIsPlaying] = useState<boolean>(false)
    const [songTitle, setSongTitle] = useState<string>('')
    const [showNowPlaying, setShowNowPlaying] = useState<boolean>(false)

    const [palette, setPalette] = useState<paletteType>([
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ])

    const [paletteIndex, setPaletteIndex] = useState<0 | 1>(0)

    useEffect(() => {
        window.addEventListener('resize', callSideTextDetect)
        callGetNowPlaying()
        const getNowPlayingInterval = setInterval(callGetNowPlaying, 2000)
        const stopAfter10Min = setTimeout(() => {
            clearInterval(getNowPlayingInterval)
        }, 600000)

        const updateProgressInterval = setInterval(callUpdateProgress, 100)

        return function cleanup() {
            window.removeEventListener('resize', callSideTextDetect)
            clearInterval(getNowPlayingInterval)
            clearTimeout(stopAfter10Min)

            clearInterval(updateProgressInterval)
        }
    }, [])

    useEffect(() => {
        setPaletteIndex(isDark ? 0 : 1)
        console.log(paletteIndex)
    }, [isDark])

    function callSideTextDetect() {
        sideTextDetect(isMobile, setSideText)
    }

    function callGetNowPlaying() {
        getNowPlaying({
            setArtURL,
            setSongURL,
            setArtists,
            setAlbumURL,
            setProgress,
            setSongTitle,
            setShowNowPlaying,
            setPalette,
            setIsPlaying,
        })
    }

    function callUpdateProgress() {
        updateProgress(setProgress)
    }

    const element = (
        <div
            id="nowPlaying"
            className={isMobile ? 'mobile ' : ''}
            style={{ backgroundColor: `rgba(${palette[paletteIndex].join(',')})` }}
        >
            <p className="status">{isPlaying ? 'Now Playing:' : 'Last Played Song:'}</p>
            <a id="albumArt" href={albumURL}>
                <img src={artURL} />
            </a>
            <div id="npInfoHolder" className={sideText ? 'side ' : ''}>
                <a className="title" href={songURL}>
                    {songTitle}
                </a>
                <p className="artists">{artists}</p>
                <p className="progress">{progress}</p>
            </div>
        </div>
    )

    return showNowPlaying ? element : null
}

export { paletteType }
