import React, { useState, lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeContext, IsLoggedOutContext } from './store'
import useCookie from '../hooks/useCookie'
import style from './base.module.scss'
import Navbar from '../components/navbar/navbar'
import Loading from '../components/loading/loading'
import Page404 from './404/404'

const MainPageOut = lazy(() => import('./mainPageOut/mainPageOut'))
const MainPageIn = lazy(() => import('./mainPageIn/mainPageIn'))
const TopPage = lazy(() => import('./topPage/topPage'))
const AccountPage = lazy(() => import('./account/account'))
const PrivacyPage = lazy(() => import('./privacyPolicy/privacyPolicy'))

function useDark() {
    const [isDark, setIsDark] = useState(checkIsDark())

    useEffect(() => {
        localStorage.setItem('isDark', isDark.toString())
        const classList = document.body.classList

        if (isDark) {
            classList.remove(style.light)
            return
        }
        classList.add(style.light)
    }, [isDark])

    function checkIsDark() {
        const darkData = localStorage.getItem('isDark')

        if (darkData == 'false') {
            return false
        }

        return true
    }

    function toggleTheme() {
        setIsDark(prevState => !prevState)
    }

    return { isDark, toggleTheme }
}

function Main() {
    const cookies = useCookie()
    const isLoggedOut = !cookies.uname || !cookies.state
    const { isDark, toggleTheme } = useDark()

    useEffect(() => {
        document.body.classList.add(style.body)
    }, [])

    function getMainPageRouting() {
        let pageElement = null

        if (isLoggedOut) {
            pageElement = <MainPageOut />
        } else {
            pageElement = <MainPageIn />
        }

        return <Suspense fallback={<Loading />}>{pageElement}</Suspense>
    }

    function getTopTracksRouting() {
        if (isLoggedOut) {
            return <Navigate to="/" />
        }
        return (
            <Suspense fallback={<Loading />}>
                <TopPage />
            </Suspense>
        )
    }

    function getAccountPageRouting() {
        if (isLoggedOut) {
            return <Navigate to="/" />
        }
        return (
            <Suspense fallback={<Loading />}>
                <AccountPage />
            </Suspense>
        )
    }

    function getPrivacyPageRouting() {
        if (isLoggedOut) {
            return (
                <Suspense fallback={<Loading />}>
                    <PrivacyPage />
                </Suspense>
            )
        }

        return <Navigate to="/?dropdown&privacy" />
    }

    return (
        <BrowserRouter>
            <ThemeContext.Provider value={{ isDark, toggleTheme }}>
                <IsLoggedOutContext.Provider value={isLoggedOut}>
                    <Navbar />
                </IsLoggedOutContext.Provider>
                <Routes>
                    <Route path="/" element={getMainPageRouting()} />
                    <Route path="/top_tracks" element={getTopTracksRouting()} />
                    <Route path="/account" element={getAccountPageRouting()} />
                    <Route path="/privacy" element={getPrivacyPageRouting()} />
                    <Route path="*" element={<Page404 />} />
                </Routes>
            </ThemeContext.Provider>
        </BrowserRouter>
    )
}

export default Main
