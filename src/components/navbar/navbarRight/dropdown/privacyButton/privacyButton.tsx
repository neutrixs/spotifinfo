import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

import Popup from '../../../../../components/popup/popup'
import PrivacyText from '../../../../../components/privacyText/privacyText'

interface props {
    isDark: boolean
}

export default function PrivacyButton({ isDark }: props) {
    const [isOpen, setIsOpen] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()

    const privacyElement = (
        <Popup title="Privacy Policy" {...{ isDark, setIsOpen }}>
            <PrivacyText {...{ isDark }} />
        </Popup>
    )

    useEffect(() => {
        if (searchParams.get('privacy') === null) return

        setIsOpen(true)
        searchParams.delete('privacy')
        setSearchParams(searchParams)
    }, [searchParams])

    function openPrivacy() {
        setIsOpen(true)
    }

    return (
        <div>
            <div role="button" tabIndex={0} onClick={openPrivacy} onKeyPress={openPrivacy}>
                <span>Privacy Policy</span>
            </div>
            {isOpen ? privacyElement : null}
        </div>
    )
}
