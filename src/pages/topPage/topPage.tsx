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
    const [isMobile, setIsMobile] = useState(mdHandlerBoolean())

    useEffect(() => {
        window.addEventListener('resize', callMdHandler)

        return function cleanup() {
            window.removeEventListener('resize', callMdHandler)
        }
    })

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

export { typeSelector, rangeSelector }
