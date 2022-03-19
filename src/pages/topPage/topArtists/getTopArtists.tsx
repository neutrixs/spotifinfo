import * as React from 'react'

import getToken from '../../../scripts/getToken'

import { rangeSelector } from '../topPage'

import spotifyTopArtistsType from '../../../types/spotifyTopArtists'

export default async function getTopArtists(
    range: rangeSelector,
    setData: React.Dispatch<React.SetStateAction<JSX.Element[]>>,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) {
    let rangeParsed = ''

    switch (range) {
        case rangeSelector.allTime:
            rangeParsed = 'long_term'
            break
        case rangeSelector.sixMonth:
            rangeParsed = 'medium_term'
            break
        case rangeSelector.oneMonth:
            rangeParsed = 'short_term'
            break
    }

    const param = new URLSearchParams()
    param.append('time_range', rangeParsed)
    param.append('limit', '50')

    const rawResponse = await fetch('https://api.spotify.com/v1/me/top/artists?' + param.toString(), {
        method: 'GET',
        headers: {
            Authorization: localStorage.getItem('token'),
        },
    })

    const status = rawResponse.status

    switch (status) {
        case 400:
        case 401:
        case 403:
            await getToken()
            getTopArtists(range, setData, setIsLoading)
            return
    }

    const data = (await rawResponse.json()) as spotifyTopArtistsType

    const dataToSet: JSX.Element[] = []

    for (let i = 0; i < data.items.length; i++) {
        const currentData = data.items[i]
        const key = `topArtists${range}${currentData.id}`

        dataToSet.push(
            <div key={key} className="content">
                <div className="number">
                    <span>{i + 1}</span>
                </div>
                <a href={currentData.external_urls.spotify} className="artHolder">
                    <img src={currentData.images[1].url} alt="" />
                </a>
                <a href={currentData.external_urls.spotify} className="infoHolder">
                    <p>{currentData.name}</p>
                </a>
            </div>
        )
    }

    setData(dataToSet)
    setIsLoading(false)
}
