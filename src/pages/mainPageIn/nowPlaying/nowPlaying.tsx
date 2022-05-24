import React, { useState, useEffect, useLayoutEffect, useRef, useContext, useId } from 'react'
import { ThemeContext } from '../../store'
import useIsMobile from '../../../hooks/useIsMobile'
import useDimension from '../../../hooks/useDimension'
import spotifyPlaybackState from '../../../types/spotifyPlaybackState'
import getToken from '../../../scripts/getToken'
import getColour from './colour/getColour'
import style from './np.module.scss'

interface props {
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export default function NowPlaying({ setIsLoading }: props) {
    const id = useId()
    const isMobile = useIsMobile(66.5)
    const { isDark } = useContext(ThemeContext)
    const [imageElement, setImageElement] = useState<HTMLImageElement | null>(null)
    const [npHolderElement, setNpHolderElement] = useState<HTMLDivElement | null>(null)
    const [playbackData, setPlaybackData] = useState<spotifyPlaybackState | null>(null)
    const isSideText = useSideText(imageElement, npHolderElement, playbackData)
    const { currentPosition, trackLength } = useProgress(playbackData)
    const [palette, setPalette] = useState<number[][]>([
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ])

    useEffect(() => {
        getNowPlaying()
        const interval = setInterval(getNowPlaying, 2000)

        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        if (!imageElement) return

        function callGetColour() {
            if (!imageElement) return
            getColour(setPalette, imageElement)
        }

        imageElement.addEventListener('load', callGetColour)

        return () => {
            imageElement.removeEventListener('load', callGetColour)
        }
    }, [imageElement])

    useEffect(() => {
        if (playbackData) setIsLoading(false)
    }, [playbackData])

    async function getNowPlaying(): Promise<void> {
        if (localStorage.getItem('noNPFetch') == 'true') {
            document.title = 'NONPFETCH IS ENABLED!'
            return
        }

        const token = localStorage.getItem('token')
        if (!token) {
            await getToken()
            return getNowPlaying()
        }

        const response = await fetch('https://api.spotify.com/v1/me/player', {
            method: 'GET',
            headers: {
                Authorization: token,
            },
        })

        switch (response.status) {
            case 204:
                setPlaybackData(null)
                return
            case 400:
            case 401:
            case 403:
                await getToken()
                return getNowPlaying()
        }

        const parsedResponse = (await response.json()) as spotifyPlaybackState

        setPlaybackData(parsedResponse)
    }

    function renderArtists(): JSX.Element[] {
        if (!playbackData?.item) {
            return []
        }

        return playbackData.item.artists.map((artist, index) => (
            <span key={id + '.artists.' + artist.id}>
                <a href={artist.external_urls.spotify}>{artist.name}</a>
                {index != (playbackData.item?.artists.length as number) - 1 ? <span>, </span> : null}
            </span>
        ))
    }

    return (
        <div
            className={style.holder + ' ' + (isMobile ? style.mobile : '')}
            style={{
                backgroundColor: `rgba(${palette[isDark ? 0 : 1].join(',')})`,
                display: playbackData?.item ? '' : 'none',
            }}
            ref={setNpHolderElement}
        >
            <p className={style.status}>{playbackData?.is_playing ? 'Now Playing:' : 'Last Played Song:'}</p>
            <a className={style.albumArt} href={playbackData?.item?.album.external_urls.spotify || ''}>
                <img ref={setImageElement} src={playbackData?.item?.album.images[0].url || ''} crossOrigin="anonymous" />
            </a>
            <div className={style.infoHolder + ' ' + (isSideText ? style.side : '')}>
                <a className={style.title} href={playbackData?.item?.external_urls.spotify || ''}>
                    {playbackData?.item?.name || ''}
                </a>
                <p className={style.artists}>{renderArtists()}</p>
                <p className={style.progress}>
                    {currentPosition} / {trackLength}
                </p>
            </div>
        </div>
    )
}

function useSideText(
    imageElement: HTMLImageElement | null,
    parentElement: HTMLDivElement | null,
    playbackData: spotifyPlaybackState | null
) {
    const [isSideText, setIsSideText] = useState(checkIsSideText())
    const { width: windowWidth } = useDimension()

    // playbackData is also added to dependencies to detect changes to parent's 'display none' property
    useLayoutEffect(() => {
        setIsSideText(checkIsSideText())
    }, [windowWidth, playbackData])

    function checkIsSideText() {
        // there's still nothing anyway so this is ok
        if (!imageElement || !parentElement) {
            return true
        }

        const pComputed = getComputedStyle(parentElement)

        const imageElementWidth = imageElement.clientWidth
        // this will be minus if display is none, but still works lol
        const parentElementWidth =
            parentElement.clientWidth - parseFloat(pComputed.paddingLeft) - parseFloat(pComputed.paddingRight)

        return imageElementWidth / parentElementWidth < 0.5
    }

    return isSideText
}

function useProgress(playbackData: spotifyPlaybackState | null) {
    const [currentPositionInS, setCurrentPositionInS] = useState(0)
    const [trackLengthInS, setTrackLengthInS] = useState(0)
    // using ref because this is used inside an interval
    // which ofc doesn't get a latest state
    const currentPositionInMS = useRef(0)
    const trackLengthInMS = useRef(0)
    const isPlaying = useRef(playbackData?.is_playing || false)

    useEffect(() => {
        currentPositionInMS.current = playbackData?.progress_ms || 0
        trackLengthInMS.current = playbackData?.item?.duration_ms || 0
        isPlaying.current = playbackData?.is_playing || false

        setCurrentPositionInS(Math.floor(currentPositionInMS.current / 1000))
        setTrackLengthInS(Math.floor(trackLengthInMS.current / 1000))
    }, [playbackData])

    useEffect(() => {
        function update() {
            if (!isPlaying.current) return

            const newCurrentPosition = currentPositionInMS.current + 100
            if (newCurrentPosition > trackLengthInMS.current) return

            currentPositionInMS.current = newCurrentPosition
            setCurrentPositionInS(Math.floor(currentPositionInMS.current / 1000))
        }

        update()
        const interval = setInterval(update, 100)

        return () => clearInterval(interval)
    }, [])

    function convertSecondToTimeFormat(s: number) {
        const minute = Math.floor(s / 60)
        const secondUnparsed = s % 60
        const second = (secondUnparsed < 10 ? '0' : '') + secondUnparsed

        return minute + ':' + second
    }

    const currentPosition = convertSecondToTimeFormat(currentPositionInS)
    const trackLength = convertSecondToTimeFormat(trackLengthInS)

    return { currentPosition, trackLength }
}
