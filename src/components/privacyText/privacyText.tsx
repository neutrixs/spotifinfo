import React, { useState, useEffect } from 'react'

import style from './privacyText.module.scss'

import Loading from '../loading/loading'

interface props {
    isDark: boolean
}

export default function PrivacyText({ isDark }: props) {
    const [isLoading, setIsLoading] = useState(true)
    const [textElement, setTextElement] = useState<JSX.Element>(null)

    useEffect(() => {
        ;(async () => {
            const { default: Markdown } = await import('react-markdown')
            const { default: text } = await import('./privacyPolicy.md')

            setTextElement(<Markdown>{text}</Markdown>)
            setIsLoading(false)
        })()
    }, [])

    return (
        <div className={style.privacyText + ' ' + (!isDark ? style.light : '')}>
            {isLoading ? <Loading isDark={isDark} /> : null}
            {textElement}
        </div>
    )
}
