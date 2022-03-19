import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import Popup from '../../popup/popup'

import PrivacyText from '../../privacyText/privacyText'

interface props {
    isDark: boolean
}

export default function PrivacyButton({ isDark }: props) {
    const [privacyIsOpened, setPrivacyIsOpened] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()

    const popupElement = (
        <Popup title="Privacy Policy" setIsOpen={setPrivacyIsOpened} isDark={isDark}>
            <PrivacyText isDark={isDark} />
        </Popup>
    )

    useEffect(() => {
        if (searchParams.get('privacy') === null) return

        setPrivacyIsOpened(true)
        searchParams.delete('privacy')
        setSearchParams(searchParams)
    }, [searchParams])

    return (
        <div>
            <div
                role="button"
                tabIndex={0}
                onClick={() => {
                    setPrivacyIsOpened(true)
                }}
                onKeyPress={e => {
                    if (e.key != 'Enter') return
                    setPrivacyIsOpened(true)
                }}
                style={{ cursor: 'pointer' }}
            >
                <span>Privacy Policy</span>
            </div>

            {privacyIsOpened ? popupElement : null}
        </div>
    )
}
