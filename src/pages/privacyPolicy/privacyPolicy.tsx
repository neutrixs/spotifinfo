import * as React from 'react'
import { useEffect, useState } from 'react'

import ReactMarkdown from 'react-markdown'

import Loading from '../../components/loading/loading'

import * as privacyPolicyTextURL from './privacyPolicy.md'

import './privacyPolicy.scss'

interface props {
    isDark: boolean
}

export default function Privacy({ isDark }: props) {
    const [isLoading, setIsLoading] = useState(true)
    const [privacyPolicyText, setPrivacyPolicyText] = useState('')

    useEffect(() => {
        fetch(privacyPolicyTextURL).then(async rawResponse => {
            setPrivacyPolicyText(await rawResponse.text())
            setIsLoading(false)
        })
    }, [])

    return (
        <>
            {isLoading ? <Loading isDark={isDark} /> : null}
            <div id="privacyPolicyHolder" className={!isDark ? 'light' : ''}>
                <ReactMarkdown>{privacyPolicyText}</ReactMarkdown>
            </div>
        </>
    )
}
