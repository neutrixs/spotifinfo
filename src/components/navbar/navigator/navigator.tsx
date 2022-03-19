import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import style from './style.module.scss'

interface props {
    isLoggedOut: boolean
    isDark: boolean
}

export default function Navigator({ isLoggedOut, isDark }: props) {
    const location = useLocation()
    const navigate = useNavigate()
    const linksHolder = useRef<HTMLDivElement>(null)

    const linksHolderLeftShadow = '0.8rem 0 0.4rem -0.4rem #00000060 inset'
    const linksHolderRightShadow = '-0.8rem 0 0.4rem -0.4rem #00000060 inset'

    const [shadowLeftActive, setShadowLeftActive] = useState(false)
    const [shadowRightActive, setShadowRightActive] = useState(false)

    function linksHolderOnScroll() {
        setShadowLeftActive(linksHolder.current.scrollLeft > 0)
        setShadowRightActive(linksHolder.current.scrollLeft + linksHolder.current.clientWidth < linksHolder.current.scrollWidth)
    }

    function getShadowBoxStyle() {
        return [shadowLeftActive ? linksHolderLeftShadow : '', shadowRightActive ? linksHolderRightShadow : '']
            .filter(Boolean)
            .join(',')
    }

    useEffect(() => {
        linksHolderOnScroll()
        window.addEventListener('resize', linksHolderOnScroll)

        return () => {
            window.removeEventListener('resize', linksHolderOnScroll)
        }
    }, [])

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
        <div
            className={style.linksHolder}
            ref={linksHolder}
            onScroll={linksHolderOnScroll}
            style={{ boxShadow: getShadowBoxStyle() }}
        >
            <a {...handleAll('/')}>Home</a>
            {isLoggedOut ? loggedOutNavigator : loggedInNavigator}
        </div>
    )
}
