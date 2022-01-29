import * as React from 'react'
import { useState, useEffect } from 'react'

import Loading from '../../loading/loading'

import getTopTracks from './getTopTracks'

import { typeSelector, rangeSelector } from '../topPage'

import '../topTrAndAr.scss'

interface props {
    selectedType: typeSelector
    selectedRange: rangeSelector
    targetRange: rangeSelector
    isDark: boolean
}

export default function TopTracks({ selectedType, selectedRange, targetRange, isDark }: props) {
    const [data, setData] = useState<JSX.Element[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getTopTracks(setData, targetRange, setIsLoading)
    }, [])

    function isShow() {
        return selectedType == typeSelector.tracks && selectedRange == targetRange
    }

    return (
        <div className="topTracksHolder" style={{ display: !isShow() ? 'none' : '' }}>
            {isLoading ? <Loading isDark={isDark} overrideStyle={{ maxWidth: '30em' }} /> : data}
        </div>
    )
}
