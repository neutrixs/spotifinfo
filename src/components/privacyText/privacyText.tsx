import React, { useState, useEffect } from 'react'

import style from './privacyText.module.scss'

import Loading from '../loading/loading'

import privacyPolicyText from './privacyPolicy.md'

interface props {
    isDark: boolean
}

export default function PrivacyText({ isDark }: props) {
    const [isLoading, setIsLoading] = useState(true)
    const [textElement, setTextElement] = useState<JSX.Element>(null)

    useEffect(() => {
        import('react-markdown').then(({ default: ReactMarkdown }) => {
            setTextElement(<ReactMarkdown>{privacyPolicyText}</ReactMarkdown>)
            setIsLoading(false)
        })
    }, [])

    return (
        <div className={style.privacyText + ' ' + (!isDark ? style.light : '')}>
            {isLoading ? <Loading isDark={isDark} /> : null}
            {textElement}
        </div>
    )
}
