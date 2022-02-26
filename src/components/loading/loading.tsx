import * as React from 'react'

import './loading.scss'

interface props {
    isDark: boolean
    overrideStyle?: React.CSSProperties
}

export default function Loading({ isDark, overrideStyle }: props) {
    return (
        <div className="loadingAnimationHolder" style={overrideStyle ?? null}>
            <div className={'loadingAnimation ' + (!isDark ? 'loadingAnimationLight ' : '')}></div>
        </div>
    )
}
