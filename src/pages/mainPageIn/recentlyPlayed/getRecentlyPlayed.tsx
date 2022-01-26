import * as React from 'react'
import getToken from '../../other/getToken'

import recentlyPlayedType from '../../types/spotifyRecentlyPlayed'

interface props {
    setShowRecentlyPlayed: React.Dispatch<React.SetStateAction<boolean>>
    setRecentlyPlayedData: React.Dispatch<React.SetStateAction<JSX.Element[]>>
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export default async function getRecentlyPlayed(props: props) {
    if (!localStorage.getItem('token')) {
        await getToken()
        await getRecentlyPlayed(props)
        return
    }

    const rawResponse = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=50', {
        method: 'GET',
        headers: {
            authorization: localStorage.getItem('token'),
        },
    })

    switch (rawResponse.status) {
        case 400:
        case 401:
        case 403:
            await getToken()
            await getRecentlyPlayed(props)
            return
    }

    const data = (await rawResponse.json()) as recentlyPlayedType

    const dataToUpdate: JSX.Element[] = []

    let currentDate = 0

    for (let i = 0; i < data.items.length; i++) {
        const currentData = data.items[i]

        const dateInStr = new Date(currentData.played_at).toLocaleDateString('en-GB', { dateStyle: 'medium' })

        const elementKey = `${i}${currentData.track.id}`

        if (+new Date(dateInStr) != currentDate) {
            currentDate = +new Date(dateInStr)

            dataToUpdate.push(
                <p className="a" key={`date${elementKey}`}>
                    {dateInStr}
                </p>
            )
        }

        dataToUpdate.push(
            <div key={`rP${elementKey}}`}>
                <a className="artHolder" href={currentData.track.album.external_urls.spotify}>
                    <img src={currentData.track.album.images[1].url} />
                </a>
                <a className="infoHolder" href={currentData.track.external_urls.spotify}>
                    <p>{currentData.track.name}</p>
                    <p>{currentData.track.artists.map(a => a.name).join(', ')}</p>
                </a>
            </div>
        )
    }

    props.setShowRecentlyPlayed(true)
    props.setIsLoading(false)
    props.setRecentlyPlayedData(dataToUpdate)
}
