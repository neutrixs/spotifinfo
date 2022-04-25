import React, { useState, useEffect, useContext } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ThemeContext } from '../../../../../pages/store'

import Popup from '../../../../../components/popup/popup'
import PrivacyText from '../../../../../components/privacyText/privacyText'

export default function PrivacyButton() {
    const [isOpen, setIsOpen] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()
    const { isDark } = useContext(ThemeContext)

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
                <span style={{ cursor: 'pointer' }}>Privacy Policy</span>
            </div>
            {isOpen ? privacyElement : null}
        </div>
    )
}
