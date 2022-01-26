import * as React from 'react'

import './recaptchaBadge.scss'

interface props {
    isDark: boolean
    overrideStyle?: React.CSSProperties
}

export default function RecaptchaBadge(props: props) {
    return (
        <div id="recaptchaBadge" className={!props.isDark ? 'light' : ''} style={props.overrideStyle ?? null}>
            This site is protected by reCAPTCHA and the Google
            <a href="https://policies.google.com/privacy"> Privacy Policy </a> and
            <a href="https://policies.google.com/terms"> Terms of Service </a> apply.
        </div>
    )
}
