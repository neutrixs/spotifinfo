import * as React from 'react'
import { useState, useEffect } from 'react'

import { typeSelector, rangeSelector } from '../topPage'

import Loading from '../../../components/loading/loading'

import getTopArtists from './getTopArtists'

import style from '../topTrAndAr.module.scss'

interface props {
    selectedType: typeSelector
    selectedRange: rangeSelector
    targetRange: rangeSelector
    isDark: boolean
}

export default function TopArtists({ selectedType, selectedRange, targetRange, isDark }: props) {
    const [data, setData] = useState<JSX.Element[]>([])
    const [loading, setIsLoading] = useState(true)

    useEffect(() => {
        getTopArtists(targetRange, setData, setIsLoading)
    }, [])

    function isShow() {
        return selectedType == typeSelector.artists && selectedRange == targetRange
    }

    return (
        <div className={style.topArtistsHolder} style={{ display: !isShow() ? 'none' : '' }}>
            {loading ? <Loading isDark={isDark} overrideStyle={{ maxWidth: '30em' }} /> : data}
        </div>
    )
}
