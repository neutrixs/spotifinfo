import React, { ReactNode, useState, useEffect, useContext } from 'react'
import { ThemeContext } from '../../pages/store'

import style from './popup.module.scss'

import xIcon from '../../svg/x.svg'
import xIconLight from '../../svg/x_light.svg'

interface props {
    children: ReactNode
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    title: string
}

export default function Popup({ setIsOpen, children, title }: props) {
    const [isFullyOpened, setIsFullyOpened] = useState(false)
    const { isDark } = useContext(ThemeContext)

    useEffect(() => {
        setIsFullyOpened(true)
    }, [])

    function closePopup() {
        setIsFullyOpened(false)
        setTimeout(() => {
            setIsOpen(false)
        }, 100)
    }

    return (
        <>
            <div
                className={style.popupBackground + ' ' + (isFullyOpened ? style.show : '')}
                onClick={() => {
                    closePopup()
                }}
            />
            <div className={style.popup + ' ' + (isFullyOpened ? style.show : '') + ' ' + (!isDark ? style.light : '')}>
                <div className={style.topHolder}>
                    <p>{title}</p>
                    <img
                        src={isDark ? xIcon : xIconLight}
                        role="button"
                        tabIndex={1}
                        onClick={() => {
                            closePopup()
                        }}
                        onKeyPress={e => {
                            if (e.key != 'Enter') return
                            closePopup()
                        }}
                    />
                </div>
                <div className={style.content}>{children}</div>
            </div>
        </>
    )
}
