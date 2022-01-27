import * as React from 'react'
import { useState, useEffect } from 'react'

import { mdHandlerBoolean, mdHandler } from '../other/mdHandler'

import TypeSelector from './selectors/typeSelector'

import './topPage.scss'

interface props {
    isDark: boolean
}

enum typeSelector {
    tracks,
    artists,
}

enum rangeSelector {
    allTime,
    sixMonth,
    oneMonth,
}

export default function TopPage({ isDark }: props) {
    const [selectedType, setSelectedType] = useState(typeSelector.tracks)
    const [selectedRange, setSelectedRange] = useState(rangeSelector.allTime)
    const [isMobile, setIsMobile] = useState(mdHandlerBoolean())

    useEffect(() => {
        window.addEventListener('resize', callMdHandler)

        setTypeFromLS(setSelectedType)
        setRangeFromLS(setSelectedRange)

        return function cleanup() {
            window.removeEventListener('resize', callMdHandler)
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('selectedType', selectedType.toString())
        localStorage.setItem('selectedRange', selectedRange.toString())
    }, [selectedRange, selectedType])

    function callMdHandler() {
        mdHandler(setIsMobile)
    }

    return (
        <div id="topPage" className={isMobile ? 'mobile' : ''}>
            <div id="content">
                <p id="title">Top {selectedType == typeSelector.tracks ? 'Tracks' : 'Artists'}</p>
                <div id="selectorsHolder">
                    <TypeSelector isDark={isDark} selectedType={selectedType} setSelectedType={setSelectedType} />
                </div>
            </div>
        </div>
    )
}

function setTypeFromLS(setSelectedType: React.Dispatch<React.SetStateAction<typeSelector>>) {
    const typeValueStr = localStorage.getItem('selectedType')

    if (!typeValueStr) return

    const typeValue = parseInt(typeValueStr)

    if (!typeValue) return

    switch (typeValue) {
        case typeSelector.tracks:
            setSelectedType(typeSelector.tracks)
            return
        case typeSelector.artists:
            setSelectedType(typeSelector.artists)
            return
    }
}

function setRangeFromLS(setSelectedRange: React.Dispatch<React.SetStateAction<rangeSelector>>) {
    const rangeValueStr = localStorage.getItem('selectedRange')

    if (!rangeValueStr) return

    const rangeValue = parseInt(rangeValueStr)

    if (!rangeValue) return

    switch (rangeValue) {
        case rangeSelector.allTime:
            setSelectedRange(rangeSelector.allTime)
        case rangeSelector.sixMonth:
            setSelectedRange(rangeSelector.sixMonth)
        case rangeSelector.oneMonth:
            setSelectedRange(rangeSelector.oneMonth)
    }
}

export { typeSelector, rangeSelector }
