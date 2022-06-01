import * as React from 'react'
import { useState, useEffect, useId } from 'react'
import getToken from '../../../scripts/getToken'
import Loading from '../../../components/loading/loading'
import { typeSelector, rangeSelector } from '../topPage'
import topTracksType from '../../../types/spotifyTopTracks'
import style from '../topTrAndAr.module.scss'

interface props {
    selectedType: typeSelector
    selectedRange: rangeSelector
    targetRange: rangeSelector
}

export default function TopTracks({ selectedType, selectedRange, targetRange }: props) {
    const [data, setData] = useState<topTracksType | null>(null)
    const id = useId()
    const isShow = selectedType == typeSelector.tracks && selectedRange == targetRange

    useEffect(() => {
        getData()
    }, [])

    async function getData(): Promise<void> {
        const apiRangeName: { [key in rangeSelector]: string } = {
            [rangeSelector.allTime]: 'long_term',
            [rangeSelector.sixMonth]: 'medium_term',
            [rangeSelector.oneMonth]: 'short_term',
        }
        const time_range = apiRangeName[targetRange]
        const limit = '50'

        const params = new window.URLSearchParams({ time_range, limit })

        const Authorization = localStorage.getItem('token')

        if (!Authorization) {
            await getToken()
            return getData()
        }

        const response = await fetch('https://api.spotify.com/v1/me/top/tracks/?' + params.toString(), {
            method: 'GET',
            headers: { Authorization },
        })

        switch (response.status) {
            case 400:
            case 401:
            case 403:
                await getToken()
                return getData()
        }

        const parsedResponse = (await response.json()) as topTracksType

        setData(parsedResponse)
    }

    function renderData(): React.ReactNode {
        if (!data) return null

        return data.items.map((item, i) => (
            <div key={id + i} className={style.content}>
                <div className={style.number}>{i + 1}</div>
                <a href={item.album.external_urls.spotify} className={style.artHolder}>
                    <img src={item.album.images[1].url} />
                </a>
                <a href={item.external_urls.spotify} className={style.infoHolder}>
                    <p>{item.name}</p>
                    <p>{item.artists.map(artist => artist.name).join(', ')}</p>
                </a>
            </div>
        ))
    }

    return (
        <div className={style.topTracksHolder} style={{ display: !isShow ? 'none' : '' }}>
            {!data ? <Loading overrideStyle={{ maxWidth: '30em' }} /> : renderData()}
        </div>
    )
}
