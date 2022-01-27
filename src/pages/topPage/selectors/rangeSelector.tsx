import * as React from 'react'

import { rangeSelector as rangeSelectorEnum } from '../topPage'

import './selectors.scss'

interface props {
    isDark: boolean
    selectedRange: rangeSelectorEnum
    setSelectedRange: React.Dispatch<React.SetStateAction<rangeSelectorEnum>>
}

export default function RangeSelector({ isDark, selectedRange, setSelectedRange }: props) {
    function onClick(enumToSet: rangeSelectorEnum, e?: React.KeyboardEvent<HTMLDivElement>) {
        if (e && e?.key !== 'Enter') return

        setSelectedRange(enumToSet)
    }

    return (
        <div id="rangeSelector">
            <div
                className={
                    (selectedRange == rangeSelectorEnum.allTime ? 'selected ' : '') +
                    (selectedRange == rangeSelectorEnum.allTime && !isDark ? 'selectedLight ' : '')
                }
                role="button"
                tabIndex={0}
                onClick={() => {
                    onClick(rangeSelectorEnum.allTime)
                }}
                onKeyPress={e => {
                    onClick(rangeSelectorEnum.allTime, e)
                }}
            >
                <span>All Time</span>
            </div>
            <div
                className={
                    (selectedRange == rangeSelectorEnum.sixMonth ? 'selected ' : '') +
                    (selectedRange == rangeSelectorEnum.sixMonth && !isDark ? 'selectedLight ' : '')
                }
                role="button"
                tabIndex={0}
                onClick={() => {
                    onClick(rangeSelectorEnum.sixMonth)
                }}
                onKeyPress={e => {
                    onClick(rangeSelectorEnum.sixMonth, e)
                }}
            >
                <span>6 Months</span>
            </div>
            <div
                className={
                    (selectedRange == rangeSelectorEnum.oneMonth ? 'selected ' : '') +
                    (selectedRange == rangeSelectorEnum.oneMonth && !isDark ? 'selectedLight ' : '')
                }
                role="button"
                tabIndex={0}
                onClick={() => {
                    onClick(rangeSelectorEnum.oneMonth)
                }}
                onKeyPress={e => {
                    onClick(rangeSelectorEnum.oneMonth, e)
                }}
            >
                <span>1 Month</span>
            </div>
        </div>
    )
}
