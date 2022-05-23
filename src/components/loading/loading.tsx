import React, { useContext } from 'react'
import { ThemeContext } from '../../pages/store'

import style from './loading.module.scss'

interface props {
    overrideStyle?: React.CSSProperties
}

export default function Loading({ overrideStyle }: props) {
    const { isDark } = useContext(ThemeContext)

    return (
        <div className={style.loadingAnimationHolder} style={overrideStyle}>
            <div className={style.loadingAnimation + ' ' + (!isDark ? style.loadingAnimationLight : '')} />
        </div>
    )
}
