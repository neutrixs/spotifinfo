import * as React from 'react'
import { useState, useEffect } from 'react'

import { mdHandler, mdHandlerBoolean } from '../other/mdHandler'

import './mainPageIn.scss'

interface props {
    isDark: boolean
}

export default function MainPageIn({ isDark }: props) {
    const [isMobile, setIsMobile] = useState<boolean>(mdHandlerBoolean())

    useEffect(() => {
        window.addEventListener('resize', callMDHandler)

        return function cleanup() {
            window.removeEventListener('resize', callMDHandler)
        }
    }, [])

    function callMDHandler() {
        mdHandler(setIsMobile)
    }

    return (
        <div id="mainPageIn">
            <div className="content">tet</div>
        </div>
    )
}
