import React, { useState, useEffect, useContext } from 'react'
import { ThemeContext } from '../../pages/store'

import style from './privacyText.module.scss'

import Loading from '../loading/loading'

export default function PrivacyText() {
    const [isLoading, setIsLoading] = useState(true)
    const [textElement, setTextElement] = useState<JSX.Element | null>(null)
    const { isDark } = useContext(ThemeContext)

    useEffect(() => {
        ;(async () => {
            const markdownWait = import('react-markdown')
            const textWait = import('./privacyPolicy.md')

            const { default: Markdown } = await markdownWait
            const { default: text } = await textWait

            setTextElement(<Markdown>{text}</Markdown>)
            setIsLoading(false)
        })()
    }, [])

    return (
        <div className={style.privacyText + ' ' + (!isDark ? style.light : '')}>
            {isLoading ? <Loading /> : null}
            {textElement}
        </div>
    )
}
