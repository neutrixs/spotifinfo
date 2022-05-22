import * as React from 'react'
import { useState, useEffect } from 'react'
import useIsMobile from '../../hooks/useIsMobile'

import TypeSelector from './selectors/typeSelector'
import RangeSelector from './selectors/rangeSelector'
import TopTracks from './topTracks/topTracks'
import TopArtists from './topArtists/topArtists'
import RecaptchaBadge from '../../components/recaptchaBadge/recaptchaBadge'

import { setType, setRange } from './setTypeAndRange'

import style from './topPage.module.scss'

enum typeSelector {
    tracks,
    artists,
}

enum rangeSelector {
    allTime,
    sixMonth,
    oneMonth,
}

export default function TopPage() {
    const isMobile = useIsMobile(66.5)
    const [selectedType, setSelectedType] = useState(setType())
    const [selectedRange, setSelectedRange] = useState(setRange())

    useEffect(() => {
        localStorage.setItem('selectedType', selectedType.toString())
        localStorage.setItem('selectedRange', selectedRange.toString())
    }, [selectedRange, selectedType])

    const topComponentProps = (range: keyof typeof rangeSelector) => ({
        targetRange: rangeSelector[range],
        selectedRange,
        selectedType,
    })

    return (
        <div className={style.topPage + ' ' + (isMobile ? style.mobile : '')}>
            <div className={style.content}>
                <p className={style.title}>Top {selectedType == typeSelector.tracks ? 'Tracks' : 'Artists'}</p>
                <div className={style.selectorsHolder}>
                    <TypeSelector {...{ selectedType, setSelectedType }} />
                    <RangeSelector {...{ selectedRange, setSelectedRange }} />
                </div>

                <TopTracks {...topComponentProps('allTime')} />
                <TopTracks {...topComponentProps('sixMonth')} />
                <TopTracks {...topComponentProps('oneMonth')} />

                <TopArtists {...topComponentProps('allTime')} />
                <TopArtists {...topComponentProps('sixMonth')} />
                <TopArtists {...topComponentProps('oneMonth')} />
            </div>

            <RecaptchaBadge />
        </div>
    )
}

export { typeSelector, rangeSelector }
