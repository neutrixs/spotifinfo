import React, { useContext } from 'react'
import { ThemeContext } from '../../pages/store'

import style from './recaptchaBadge.module.scss'
import '../hideGrecaptcha/hideGrecaptcha.scss'

interface props {
    overrideStyle?: React.CSSProperties
}

export default function RecaptchaBadge(props: props) {
    const { isDark } = useContext(ThemeContext)

    return (
        <div className={style.badge + ' ' + (!isDark ? style.light : '')} style={props.overrideStyle}>
            This site is protected by reCAPTCHA and the Google
            <a href="https://policies.google.com/privacy"> Privacy Policy </a> and
            <a href="https://policies.google.com/terms"> Terms of Service </a> apply.
        </div>
    )
}
