import React, { useState } from 'react'

export default function PrivacyButton() {
    const [privacyIsOpened, setPrivacyIsOpened] = useState(false)

    return (
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
    )
}
