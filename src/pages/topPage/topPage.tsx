import * as React from 'react'

interface props {
    isDark: boolean
}

export default function TopPage({ isDark }: props) {
    return (
        <div id="topPage">
            <div id="content"></div>
        </div>
    )
}
