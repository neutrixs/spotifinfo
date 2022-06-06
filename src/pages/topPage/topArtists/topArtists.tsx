import * as React from 'react'
import { useState, useEffect } from 'react'
import { typeSelector, rangeSelector } from '../topPage'
import getToken from '../../../scripts/getToken'
import Loading from '../../../components/loading/loading'
import spotifyTopArtistsType from '../../../types/spotifyTopArtists'
import style from '../topTrAndAr.module.scss'

interface props {
    selectedType: typeSelector
    selectedRange: rangeSelector
    targetRange: rangeSelector
}

export default function TopArtists({ selectedType, selectedRange, targetRange }: props) {
    const [data, setData] = useState<spotifyTopArtistsType | null>(null)
    const isLoading = !data
    const isShow = selectedType == typeSelector.artists && selectedRange == targetRange

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

        const params = new window.URLSearchParams({
            time_range,
            limit,
        })

        const Authorization = localStorage.getItem('token')

        if (!Authorization) {
            await getToken()
            return getData()
        }

        const response = await fetch('https://api.spotify.com/v1/me/top/artists?' + params.toString(), {
            method: 'GET',
            headers: {
                Authorization,
            },
        })

        const parsedResponse = (await response.json()) as spotifyTopArtistsType

        setData(parsedResponse)
    }

    function renderData(): React.ReactNode {
        if (!data) return null

        return data.items.map<React.ReactNode>((item, i) => (
            <div key={item.id + i} className={style.content}>
                <div className={style.number}>
                    <span>{i + 1}</span>
                </div>
                <a href={item.external_urls.spotify} className={style.artHolder}>
                    <img src={item.images[1].url} alt={item.name} />
                </a>
                <a href={item.external_urls.spotify} className={style.infoHolder}>
                    <p>{item.name}</p>
                </a>
            </div>
        ))
    }

    return (
        <div className={style.topArtistsHolder} style={{ display: !isShow ? 'none' : '' }}>
            {isLoading ? <Loading overrideStyle={{ maxWidth: '30em' }} /> : renderData()}
        </div>
    )
}
