import * as React from 'react'
import { typeSelector, rangeSelector } from './topPage'

function setType(): typeSelector {
    const typeValue = parseInt(localStorage.getItem('selectedType') || '')

    switch (typeValue) {
        case typeSelector.tracks:
            return typeSelector.tracks
        case typeSelector.artists:
            return typeSelector.artists
        default:
            return typeSelector.tracks
    }
}

function setRange(): rangeSelector {
    const rangeValue = parseInt(localStorage.getItem('selectedRange') || '')

    switch (rangeValue) {
        case rangeSelector.allTime:
            return rangeSelector.allTime
        case rangeSelector.sixMonth:
            return rangeSelector.sixMonth
        case rangeSelector.oneMonth:
            return rangeSelector.oneMonth
        default:
            return rangeSelector.allTime
    }
}

export { setType, setRange }
