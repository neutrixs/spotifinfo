import React, { useState, useEffect } from 'react'
import getToken from '../../../scripts/getToken'
import recentlyPlayedType from '../../../types/spotifyRecentlyPlayed'
import style from './recentlyPlayed.module.scss'

interface props {
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

function RecentlyPlayed({ setIsLoading }: props) {
    const [recentlyPlayedData, setRecentlyPlayedData] = useState<recentlyPlayedType | null>(null)

    useEffect(() => {
        getRecentlyPlayed()
    }, [])

    async function getRecentlyPlayed() {
        const token = localStorage.getItem('token')

        if (!token) {
            await getToken()
            await getRecentlyPlayed()
            return
        }

        const APIResponse = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=50', {
            method: 'GET',
            headers: {
                authorization: token,
            },
        })

        switch (APIResponse.status) {
            case 400:
            case 401:
            case 403:
                await getToken()
                await getRecentlyPlayed()
                return
        }

        const data = (await APIResponse.json()) as recentlyPlayedType

        setRecentlyPlayedData(data)
        setIsLoading(false)
    }

    function renderRecentlyPlayedData(): React.ReactNode {
        if (!recentlyPlayedData) {
            return null
        }

        let currentDate = 0

        return recentlyPlayedData.items.map((item, i) => {
            // i don't know how it will work with local track so
            const elementKey = item.track.id || i.toString()
            const playedDateAtMidnight = new Date(item.played_at).setHours(0, 0, 0, 0)
            const elementsToReturn: JSX.Element[] = []

            if (playedDateAtMidnight != currentDate) {
                currentDate = playedDateAtMidnight

                elementsToReturn.push(
                    <p className={style.date} key={elementKey + 'date'}>
                        {new Date(playedDateAtMidnight).toLocaleDateString('en-GB', { dateStyle: 'medium' })}
                    </p>
                )
            }

            elementsToReturn.push(
                <div className={style.track} key={elementKey + 'track'}>
                    <a className={style.artHolder} target="_blank" href={item.track.album.external_urls.spotify}>
                        <img src={item.track.album.images[1].url} alt={item.track.album.name} title={item.track.album.name} />
                    </a>
                    <a className={style.infoHolder} target="_blank" href={item.track.external_urls.spotify}>
                        <p>{item.track.name}</p>
                        <p>{item.track.artists.map(artist => artist.name).join(', ')}</p>
                    </a>
                </div>
            )

            return elementsToReturn
        })
    }

    return (
        <div className={style.sectionHolder} style={{ display: !recentlyPlayedData ? 'none' : '' }}>
            <p className={style.title}>Recently Played:</p>
            <div className={style.container}>{renderRecentlyPlayedData()}</div>
        </div>
    )
}

export default RecentlyPlayed
