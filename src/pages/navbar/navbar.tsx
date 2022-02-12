import React, { useEffect, useRef, useState } from 'react'

import { NavLink } from 'react-router-dom'

import './navbar.scss'

interface props {
    isLoggedOut: boolean
    isDark: boolean
    toggleTheme: () => void
}

export default function Navbar({ isLoggedOut, isDark, toggleTheme }: props) {
    const linksHolder = useRef<HTMLDivElement>(null)
    const [isOverflowed, setIsOverflowed] = useState(false)

    const linksHolderLeftShadow = '0.8rem 0 0.4rem -0.4rem #00000080 inset'
    const linksHolderRightShadow = '-0.8rem 0 0.4rem -0.4rem #00000080 inset'

    const [shadowLeftActive, setShadowLeftActive] = useState(false)
    const [shadowRightActive, setShadowRightActive] = useState(false)

    useEffect(() => {
        setIsOverflowed(detectOverflow(linksHolder.current))
        linksHolderOnScroll()

        window.addEventListener('resize', linksHolderOnScroll)

        return () => {
            window.removeEventListener('resize', linksHolderOnScroll)
        }
    }, [])

    function linksHolderOnScroll() {
        setShadowLeftActive(linksHolder.current.scrollLeft > 0)
        setShadowRightActive(
            linksHolder.current.scrollLeft + linksHolder.current.clientWidth != linksHolder.current.scrollWidth
        )
    }

    function getShadowBoxStyle() {
        const bruh = [shadowLeftActive ? linksHolderLeftShadow : '', shadowRightActive ? linksHolderRightShadow : '']
            .filter(Boolean)
            .join(',')

        return bruh
    }

    return (
        <nav>
            <div
                className="linksHolder"
                ref={linksHolder}
                onScroll={linksHolderOnScroll}
                style={{ boxShadow: getShadowBoxStyle() }}
            >
                <NavLink exact to="/" className="pageLink">
                    <span>Home</span>
                </NavLink>
                {!isLoggedOut ? loggedInNavigation : null}
                <NavLink exact to="/privacy" className="pageLink">
                    <span>Privacy Policy</span>
                </NavLink>
            </div>
        </nav>
    )
}

const loggedInNavigation = (
    <>
        <NavLink exact to="/top_tracks" className="pageLink">
            <span>Top Tracks</span>
        </NavLink>
        <NavLink exact to="/account" className="pageLink">
            <span>Account</span>
        </NavLink>
    </>
)

const getWindowSizeInEM = () => window.innerWidth / parseFloat(getComputedStyle(document.body).fontSize)

const detectOverflow = (element: HTMLDivElement) => element.scrollWidth > element.clientWidth
