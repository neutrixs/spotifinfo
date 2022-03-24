import * as React from 'react'
import { useState, useEffect } from 'react'

import { mdHandlerBoolean, mdHandler } from '../../scripts/mdHandler'

import TypeSelector from './selectors/typeSelector'
import RangeSelector from './selectors/rangeSelector'

import TopTracks from './topTracks/topTracks'
import TopArtists from './topArtists/topArtists'

import RecaptchaBadge from '../../components/recaptchaBadge/recaptchaBadge'

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

    const topComponentProps = (range: keyof typeof rangeSelector) => ({
        targetRange: rangeSelector[range],
        selectedRange,
        selectedType,
        isDark,
    })

    return (
        <div id="topPage" className={isMobile ? 'mobile' : ''}>
            <div id="content">
                <p id="title">Top {selectedType == typeSelector.tracks ? 'Tracks' : 'Artists'}</p>
                <div id="selectorsHolder">
                    <TypeSelector {...{ isDark, selectedType, setSelectedType }} />
                    <RangeSelector {...{ isDark, selectedRange, setSelectedRange }} />
                </div>

                <TopTracks {...topComponentProps('allTime')} />
                <TopTracks {...topComponentProps('sixMonth')} />
                <TopTracks {...topComponentProps('oneMonth')} />

                <TopArtists {...topComponentProps('allTime')} />
                <TopArtists {...topComponentProps('sixMonth')} />
                <TopArtists {...topComponentProps('oneMonth')} />
            </div>

            <RecaptchaBadge isDark={isDark} />
        </div>
    )
}

export { typeSelector, rangeSelector }
