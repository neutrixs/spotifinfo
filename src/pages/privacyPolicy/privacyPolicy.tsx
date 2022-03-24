import * as React from 'react'

import PrivacyText from '../../components/privacyText/privacyText'

import '../../components/hideGrecaptcha/hideGrecaptcha.scss'
import style from './privacyPolicy.module.scss'

interface props {
    isDark: boolean
}

export default function Privacy({ isDark }: props) {
    return (
        <div className={style.privacyPolicyHolder + ' ' + (!isDark ? style.light : '')}>
            <h1>Privacy Policy</h1>
            <hr />
            <PrivacyText isDark={isDark} />
        </div>
    )
}
