import React, { useEffect, useRef, useState } from 'react'

import NavbarRight from './navbarRight/navbarRight'
import SpotifyLogin from './spotifyLogin/login'
import Navigator from './navigator/navigator'

import { NavLink } from 'react-router-dom'

import './navbar.scss'

interface props {
    isLoggedOut: boolean
    isDark: boolean
    toggleTheme: () => void
}

export default function Navbar({ isLoggedOut, isDark, toggleTheme }: props) {
    const linksHolder = useRef<HTMLDivElement>(null)

    const linksHolderLeftShadow = '0.8rem 0 0.4rem -0.4rem #00000060 inset'
    const linksHolderRightShadow = '-0.8rem 0 0.4rem -0.4rem #00000060 inset'

    const [shadowLeftActive, setShadowLeftActive] = useState(false)
    const [shadowRightActive, setShadowRightActive] = useState(false)

    useEffect(() => {
        linksHolderOnScroll()

        window.addEventListener('resize', linksHolderOnScroll)

        return () => {
            window.removeEventListener('resize', linksHolderOnScroll)
        }
    }, [])

    function linksHolderOnScroll() {
        setShadowLeftActive(linksHolder.current.scrollLeft > 0)
        setShadowRightActive(linksHolder.current.scrollLeft + linksHolder.current.clientWidth < linksHolder.current.scrollWidth)
    }

    function getShadowBoxStyle() {
        const bruh = [shadowLeftActive ? linksHolderLeftShadow : '', shadowRightActive ? linksHolderRightShadow : '']
            .filter(Boolean)
            .join(',')

        return bruh
    }

    return (
        <nav className={!isDark ? 'light' : ''}>
            <div
                className="linksHolder"
                ref={linksHolder}
                onScroll={linksHolderOnScroll}
                style={{ boxShadow: getShadowBoxStyle() }}
            >
                <Navigator isLoggedOut={isLoggedOut} isDark={isDark} />
            </div>
            {isLoggedOut ? <SpotifyLogin isDark={isDark} /> : <NavbarRight isDark={isDark} toggleTheme={toggleTheme} />}
        </nav>
    )
}

const getWindowSizeInEM = () => window.innerWidth / parseFloat(getComputedStyle(document.body).fontSize)

const detectOverflow = (element: HTMLDivElement) => element.scrollWidth > element.clientWidth
