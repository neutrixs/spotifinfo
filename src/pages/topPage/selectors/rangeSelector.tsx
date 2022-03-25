import * as React from 'react'

import { rangeSelector as rangeSelectorEnum } from '../topPage'

import style from './selectors.module.scss'

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

    function handleDiv(range: rangeSelectorEnum): React.HTMLAttributes<HTMLDivElement> {
        return {
            className: selectedRange == range ? (isDark ? style.selected : style.selectedLight) : '',
            role: 'button',
            tabIndex: 0,
            onClick: _ => {
                onClick(range)
            },
            onKeyPress: e => {
                onClick(range, e)
            },
        }
    }

    return (
        <div className={style.rangeSelector}>
            <div {...handleDiv(rangeSelectorEnum.allTime)}>
                <span>All Time</span>
            </div>
            <div {...handleDiv(rangeSelectorEnum.sixMonth)}>
                <span>6 Months</span>
            </div>
            <div {...handleDiv(rangeSelectorEnum.oneMonth)}>
                <span>1 Month</span>
            </div>
        </div>
    )
}
