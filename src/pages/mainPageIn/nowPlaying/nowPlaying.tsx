import * as React from 'react'
import { useState, useEffect, useRef } from 'react'

import { sideTextDetectBoolean, sideTextDetect } from './sideText'
import getNowPlaying from './getNowPlaying'
import updateProgress from './updateProgress'
import getColour from './colour/getColour'

import style from './np.module.scss'

let isMobileWithActualVariable = false

interface props {
    isDark: boolean
    isMobile: boolean
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
    getRecentlyPlayedFunc: [() => void]
}

type paletteType = [[number, number, number, number?], [number, number, number, number?]]

export default function NowPlaying({ isDark, isMobile, setIsLoading, getRecentlyPlayedFunc }: props) {
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

    const imageElement = useRef<HTMLImageElement>(null)

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
    }, [isDark])

    useEffect(() => {
        isMobileWithActualVariable = isMobile
    }, [isMobile])

    useEffect(() => {
        artURL && getColour(setPalette, imageElement.current)
    }, [artURL])

    function callSideTextDetect() {
        sideTextDetect(isMobileWithActualVariable, setSideText)
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
            setIsLoading,
            getRecentlyPlayedFunc,
        })
    }

    function callUpdateProgress() {
        updateProgress(setProgress)
    }

    return (
        <div
            className={style.holder + ' ' + (isMobile ? style.mobile : '')}
            style={{
                backgroundColor: `rgba(${palette[paletteIndex].join(',')})`,
                display: showNowPlaying ? '' : 'none',
            }}
        >
            <p className={style.status}>{isPlaying ? 'Now Playing:' : 'Last Played Song:'}</p>
            <a className={style.albumArt} href={albumURL}>
                <img ref={imageElement} src={artURL} crossOrigin="anonymous" />
            </a>
            <div className={style.infoHolder + ' ' + (sideText ? style.side : '')}>
                <a className={style.title} href={songURL}>
                    {songTitle}
                </a>
                <p className={style.artists}>{artists}</p>
                <p className={style.progress}>{progress}</p>
            </div>
        </div>
    )
}

export { paletteType }
