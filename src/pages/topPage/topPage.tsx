import * as React from 'react'
import { useState, useEffect } from 'react'

import { mdHandlerBoolean, mdHandler } from '../other/mdHandler'

import TypeSelector from './selectors/typeSelector'
import RangeSelector from './selectors/rangeSelector'

import TopTracks from './topTracks/topTracks'
import TopArtists from './topArtists/topArtists'

import RecaptchaBadge from '../recaptchaBadge/recaptchaBadge'

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

                <TopTracks
                    targetRange={rangeSelector.allTime}
                    selectedRange={selectedRange}
                    selectedType={selectedType}
                    isDark={isDark}
                />

                <TopTracks
                    targetRange={rangeSelector.sixMonth}
                    selectedRange={selectedRange}
                    selectedType={selectedType}
                    isDark={isDark}
                />

                <TopTracks
                    targetRange={rangeSelector.oneMonth}
                    selectedRange={selectedRange}
                    selectedType={selectedType}
                    isDark={isDark}
                />

                <TopArtists
                    selectedType={selectedType}
                    selectedRange={selectedRange}
                    targetRange={rangeSelector.allTime}
                    isDark={isDark}
                />

                <TopArtists
                    selectedType={selectedType}
                    selectedRange={selectedRange}
                    targetRange={rangeSelector.sixMonth}
                    isDark={isDark}
                />

                <TopArtists
                    selectedType={selectedType}
                    selectedRange={selectedRange}
                    targetRange={rangeSelector.oneMonth}
                    isDark={isDark}
                />
            </div>

            <RecaptchaBadge isDark={isDark} />
        </div>
    )
}

export { typeSelector, rangeSelector }
