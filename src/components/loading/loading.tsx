import * as React from 'react'

import style from './loading.module.scss'

interface props {
    isDark: boolean
    overrideStyle?: React.CSSProperties
}

export default function Loading({ isDark, overrideStyle }: props) {
    return (
        <div className={style.loadingAnimationHolder} style={overrideStyle ?? null}>
            <div className={style.loadingAnimation + ' ' + (!isDark ? style.loadingAnimationLight : '')} />
        </div>
    )
}
