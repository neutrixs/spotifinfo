import React, { useContext } from 'react'
import { ThemeContext } from '../store'

import PrivacyText from '../../components/privacyText/privacyText'

import '../../components/hideGrecaptcha/hideGrecaptcha.scss'
import style from './privacyPolicy.module.scss'

export default function Privacy() {
    const { isDark } = useContext(ThemeContext)

    return (
        <div className={style.privacyPolicyHolder + ' ' + (!isDark ? style.light : '')}>
            <h1>Privacy Policy</h1>
            <hr />
            <PrivacyText />
        </div>
    )
}
