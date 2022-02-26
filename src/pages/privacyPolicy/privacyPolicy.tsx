import * as React from 'react'

import PrivacyText from '../../components/privacyText/privacyText'

import './privacyPolicy.scss'

interface props {
    isDark: boolean
}

export default function Privacy({ isDark }: props) {
    return (
        <div id="privacyPolicyHolder" className={!isDark ? 'light' : ''}>
            <h1>Privacy Policy</h1>
            <hr />
            <PrivacyText isDark={isDark} />
        </div>
    )
}
