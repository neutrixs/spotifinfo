import * as React from 'react'
import { useState, useEffect } from 'react'

import { mdHandlerBoolean, mdHandler } from '../other/mdHandler'

import TypeSelector from './selectors/typeSelector'
import RangeSelector from './selectors/rangeSelector'

import { setType, setRange } from './setTypeAndRange'

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
    const [selectedType, setSelectedType] = useState(setType())
    const [selectedRange, setSelectedRange] = useState(setRange())
    const [isMobile, setIsMobile] = useState(mdHandlerBoolean())

    useEffect(() => {
        window.addEventListener('resize', callMdHandler)

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
                    <RangeSelector isDark={isDark} selectedRange={selectedRange} setSelectedRange={setSelectedRange} />
                </div>
            </div>
        </div>
    )
}

export { typeSelector, rangeSelector }
