import React, { useContext } from 'react'
import { ThemeContext } from '../../store'

import { typeSelector as typeSelectorEnum } from '../topPage'

import style from './selectors.module.scss'

interface props {
    selectedType: typeSelectorEnum
    setSelectedType: React.Dispatch<React.SetStateAction<typeSelectorEnum>>
}

export default function TypeSelector({ selectedType, setSelectedType }: props) {
    const { isDark } = useContext(ThemeContext)

    function onClick(enumToSet: typeSelectorEnum, e?: React.KeyboardEvent<HTMLDivElement>) {
        if (e && e?.key !== 'Enter') return

        setSelectedType(enumToSet)
    }

    function handleDiv(type: typeSelectorEnum): React.HtmlHTMLAttributes<HTMLDivElement> {
        return {
            className: selectedType == type ? (isDark ? style.selected : style.selectedLight) : '',
            role: 'button',
            tabIndex: 0,
            onClick: _ => {
                onClick(type)
            },
            onKeyPress: e => {
                onClick(type, e)
            },
        }
    }

    return (
        <div className={style.typeSelector}>
            <div {...handleDiv(typeSelectorEnum.tracks)}>
                <span>Top Tracks</span>
            </div>
            <div {...handleDiv(typeSelectorEnum.artists)}>
                <span>Top Artists</span>
            </div>
        </div>
    )
}
