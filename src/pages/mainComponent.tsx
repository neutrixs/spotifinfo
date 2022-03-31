import React, { useState, lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import style from './base.module.scss'

import Navbar from '../components/navbar/navbar'
import Loading from '../components/loading/loading'

import Page404 from './404/404'

const MainPageOut = lazy(() => import('./mainPageOut/mainPageOut'))
const MainPageIn = lazy(() => import('./mainPageIn/mainPageIn'))
const TopPage = lazy(() => import('./topPage/topPage'))
const AccountPage = lazy(() => import('./account/account'))
const PrivacyPage = lazy(() => import('./privacyPolicy/privacyPolicy'))

//

const checkIsLoggedOut = () => document.cookie.indexOf('state=') == -1 || document.cookie.indexOf('uname=') == -1

const checkIsDark = () => {
    const dark = localStorage.getItem('isDark')

    return dark == 'false' ? false : true
}

function useDark() {
    const [isDark, setIsDark] = useState(checkIsDark())

    function toggleTheme() {
        setIsDark(prevState => !prevState)
    }

    return { isDark, toggleTheme }
}

//

function Main() {
    const isLoggedOut = checkIsLoggedOut()

    const { isDark, toggleTheme } = useDark()

    useEffect(() => {
        localStorage.setItem('isDark', isDark.toString())
        document.body.classList[isDark ? 'remove' : 'add']('light')
    }, [isDark])

    useEffect(() => {
        document.body.classList.add(style.body)
    }, [])

    function getMainPageRouting() {
        let pageElement = null

        if (isLoggedOut) {
            pageElement = <MainPageOut />
        } else {
            pageElement = <MainPageIn isDark={isDark} />
        }

        return <Suspense fallback={<Loading isDark={isDark} />}>{pageElement}</Suspense>
    }

    function getTopTracksRouting() {
        if (isLoggedOut) {
            return <Navigate to="/" />
        }
        return (
            <Suspense fallback={<Loading isDark={isDark} />}>
                <TopPage isDark={isDark} />
            </Suspense>
        )
    }

    function getAccountPageRouting() {
        if (isLoggedOut) {
            return <Navigate to="/" />
        }
        return (
            <Suspense fallback={<Loading isDark={isDark} />}>
                <AccountPage isDark={isDark} />
            </Suspense>
        )
    }

    function getPrivacyPageRouting() {
        if (isLoggedOut) {
            return (
                <Suspense fallback={<Loading isDark={isDark} />}>
                    <PrivacyPage isDark={isDark} />
                </Suspense>
            )
        }

        return <Navigate to="/?dropdown&privacy" />
    }

    return (
        <BrowserRouter>
            <Navbar {...{ isLoggedOut, isDark, toggleTheme }} />
            <Routes>
                <Route path="/" element={getMainPageRouting()} />
                <Route path="/top_tracks" element={getTopTracksRouting()} />
                <Route path="/account" element={getAccountPageRouting()} />
                <Route path="/privacy" element={getPrivacyPageRouting()} />
                <Route path="*" element={<Page404 />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Main
