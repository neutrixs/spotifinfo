import * as React from 'react'
import { useState } from 'react'

import Loading from '../../loading/loading'

import { typeSelector, rangeSelector } from '../topPage'

import './topTracks.scss'

interface props {
    selectedType: typeSelector
    selectedRange: rangeSelector
    targetRange: rangeSelector
    isDark: boolean
}

export default function TopTracks({ selectedType, selectedRange, targetRange, isDark }: props) {
    const [data, setData] = useState<JSX.Element[]>([])
    const [isLoading, setIsLoading] = useState(true)

    function isShow() {
        return selectedType == typeSelector.tracks && selectedRange == targetRange
    }

    return (
        <div className="topTracksHolder" style={{ display: !isShow() ? 'none' : '' }}>
            {isLoading ? <Loading isDark={isDark} overrideStyle={{ maxWidth: '30em' }} /> : data}
        </div>
    )
}
