import React, { ReactNode, useState, useEffect } from 'react'

import './popup.scss'

import xIcon from '../../svg/x.svg'

interface props {
    children: ReactNode
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    title: string
}

export default function Popup({ setIsOpen, children, title }: props) {
    const [isFullyOpened, setIsFullyOpened] = useState(false)

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
                className={'popupBackground ' + (isFullyOpened ? 'show ' : '')}
                onClick={() => {
                    closePopup()
                }}
            />
            <div className={'popup ' + (isFullyOpened ? 'show ' : '')}>
                <div className="topHolder">
                    <p>{title}</p>
                    <img
                        src={xIcon}
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
            </div>
        </>
    )
}
