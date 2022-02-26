import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import Popup from '../../popup/popup'

import privacyPolicyLink from '../../../files/privacyPolicyPop.md'
import Loading from '../../../pages/loading/loading'

import './privacyButton.scss'

interface props {
    isDark: boolean
}

export default function PrivacyButton({ isDark }: props) {
    const [privacyIsOpened, setPrivacyIsOpened] = useState(false)
    const [privacyPolicyElement, setPrivacyPolicyElement] = useState<JSX.Element>(null)
    const [searchParams, setSearchParams] = useSearchParams()

    const popupElement = (
        <div id="privacyPolicyPopupHolder" className={!isDark ? 'light ' : ''}>
            <Popup title="Privacy Policy" setIsOpen={setPrivacyIsOpened} isDark={isDark}>
                {privacyPolicyElement ?? <Loading isDark={isDark} />}
            </Popup>
        </div>
    )

    useEffect(() => {
        ;(async () => {
            const data = await fetch(privacyPolicyLink)
            const text = await data.text()
            setPrivacyPolicyElement(<ReactMarkdown>{text}</ReactMarkdown>)
        })()
    }, [])

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
