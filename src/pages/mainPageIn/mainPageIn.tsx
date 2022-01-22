import * as React from 'react'

interface props {
    isDark: boolean
}

export default function MainPageIn({ isDark }: props) {
    return (
        <div id="mainPageIn">
            <div className="content"></div>
        </div>
    )
}
