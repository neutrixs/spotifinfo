import React, { useState, useEffect } from 'react'

import style from './privacyText.module.scss'

import Loading from '../loading/loading'

import privacyPolicyURL from './privacyPolicy.md'

interface props {
    isDark: boolean
}

export default function PrivacyText({ isDark }: props) {
    const [isLoading, setIsLoading] = useState(true)
    const [textElement, setTextElement] = useState<JSX.Element>(null)

    useEffect(() => {
        getPrivacyText()
    }, [])

    async function getPrivacyText() {
        const { default: ReactMarkdown } = await import('react-markdown')
        const raw = await fetch(privacyPolicyURL)
        const text = await raw.text()

        setTextElement(<ReactMarkdown>{text}</ReactMarkdown>)
        setIsLoading(false)
    }

    return (
        <div className={style.privacyText + ' ' + (!isDark ? style.light : '')}>
            {isLoading ? <Loading isDark={isDark} /> : null}
            {textElement}
        </div>
    )
}
