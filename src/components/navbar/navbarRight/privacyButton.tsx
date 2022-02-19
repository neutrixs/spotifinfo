import React, { useState } from 'react'
import Popup from '../../popup/popup'

interface props {
    isDark: boolean
}

export default function PrivacyButton({ isDark }: props) {
    const [privacyIsOpened, setPrivacyIsOpened] = useState(false)

    const popupElement = (
        <Popup title="Privacy Policy" setIsOpen={setPrivacyIsOpened} isDark={isDark}>
            <p>Lorem ipsum dolor sit amet</p>
        </Popup>
    )

    return (
        <>
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
        </>
    )
}
