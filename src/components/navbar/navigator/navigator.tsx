import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import style from './style.module.scss'

interface props {
    isLoggedOut: boolean
    isDark: boolean
}

export default function Navigator({ isLoggedOut, isDark }: props) {
    const location = useLocation()
    const navigate = useNavigate()

    function getAClassName(path: string) {
        const base = style.pageLink + ' '
        const light = (!isDark ? style.light : '') + ' '
        const isActive = location.pathname == path
        const active = (isActive ? style.active : '') + ' '

        return base + light + active
    }

    function handleClick(path: string) {
        return function (e: React.MouseEvent) {
            e.preventDefault()
            navigate(path)
        }
    }

    function handleKeyPress(path: string) {
        return function (e: React.KeyboardEvent) {
            e.preventDefault()
            navigate(path)
        }
    }

    function handleAll(path: string): React.AnchorHTMLAttributes<HTMLAnchorElement> {
        return {
            href: path,
            className: getAClassName(path),
            onClick: handleClick(path),
            onKeyPress: handleKeyPress(path),
        }
    }

    const loggedOutNavigator = <a {...handleAll('/privacy')}>Privacy Policy</a>

    const loggedInNavigator = (
        <>
            <a {...handleAll('/top_tracks')}>Top Tracks</a>
            <a {...handleAll('/account')}>Account</a>
        </>
    )

    return (
        <>
            <a {...handleAll('/')}>Home</a>
            {isLoggedOut ? loggedOutNavigator : loggedInNavigator}
        </>
    )
}
