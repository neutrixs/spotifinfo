import React, { ReactNode, useState, useEffect } from 'react'

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

    return (
        <>
            <div className={'popupBackground ' + (isFullyOpened ? 'show ' : '')} />
            <div className="popup"></div>
        </>
    )
}
