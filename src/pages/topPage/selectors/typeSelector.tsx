import * as React from 'react'

import { typeSelector as typeSelectorEnum } from '../topPage'

import './selectors.scss'

interface props {
    isDark: boolean
    selectedType: typeSelectorEnum
    setSelectedType: React.Dispatch<React.SetStateAction<typeSelectorEnum>>
}

export default function TypeSelector({ isDark, selectedType, setSelectedType }: props) {
    function onClick(enumToSet: typeSelectorEnum, e?: React.KeyboardEvent<HTMLDivElement>) {
        if (e && e?.key !== 'Enter') return

        setSelectedType(enumToSet)
    }

    return (
        <div id="typeSelector">
            <div
                className={
                    (selectedType == typeSelectorEnum.tracks ? 'selected ' : '') +
                    (selectedType == typeSelectorEnum.tracks && !isDark ? 'selectedLight ' : '')
                }
                role="button"
                tabIndex={0}
                onClick={() => {
                    onClick(typeSelectorEnum.tracks)
                }}
                onKeyPress={e => {
                    onClick(typeSelectorEnum.tracks, e)
                }}
            >
                <span>Top Tracks</span>
            </div>
            <div
                className={
                    (selectedType == typeSelectorEnum.artists ? 'selected ' : '') +
                    (selectedType == typeSelectorEnum.artists && !isDark ? 'selectedLight ' : '')
                }
                role="button"
                tabIndex={0}
                onClick={() => {
                    onClick(typeSelectorEnum.artists)
                }}
                onKeyPress={e => {
                    onClick(typeSelectorEnum.artists, e)
                }}
            >
                <span>Top Artists</span>
            </div>
        </div>
    )
}
