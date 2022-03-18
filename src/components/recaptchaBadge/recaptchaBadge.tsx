import * as React from 'react'

import style from './recaptchaBadge.module.scss'
import '../hideGrecaptcha/hideGrecaptcha.scss'

interface props {
    isDark: boolean
    overrideStyle?: React.CSSProperties
}

export default function RecaptchaBadge(props: props) {
    return (
        <div className={style.badge + ' ' + (!props.isDark ? style.light : '')} style={props.overrideStyle ?? null}>
            This site is protected by reCAPTCHA and the Google
            <a href="https://policies.google.com/privacy"> Privacy Policy </a> and
            <a href="https://policies.google.com/terms"> Terms of Service </a> apply.
        </div>
    )
}
