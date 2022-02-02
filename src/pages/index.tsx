import * as React from 'react'
import { useState, useEffect, lazy, Suspense } from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

import Navbar from './navbar/navbar'

import Loading from './loading/loading'

const MainPageOut = lazy(() => import('./mainPageOut/mainPageOut'))
const MainPageIn = lazy(() => import('./mainPageIn/mainPageIn'))
const TopPage = lazy(() => import('./topPage/topPage'))
const PrivacyPolicyPage = lazy(() => import('./privacyPolicy/privacyPolicy'))
const AccountPage = lazy(() => import('./account/account'))
const Page404 = lazy(() => import('./404/404'))

import './base.scss'

function Main() {
    const isLoggedOut = checkIsLoggedOut()

    const [isDark, setIsDark] = useState<boolean>(checkIsDark())
    const toggleTheme = () => {
        setIsDark(!isDark)
    }

    useEffect(() => {
        localStorage.setItem('isDark', isDark.toString())
        document.body.classList[isDark ? 'remove' : 'add']('light')
    }, [isDark])

    function getMainPageRouting() {
        if (isLoggedOut) {
            return (
                <Suspense fallback={<Loading isDark={isDark} />}>
                    <MainPageOut />
                </Suspense>
            )
        }

        return (
            <Suspense fallback={<Loading isDark={isDark} />}>
                <MainPageIn isDark={isDark} />
            </Suspense>
        )
    }

    return (
        <BrowserRouter>
            <Navbar isLoggedOut={isLoggedOut} toggleTheme={toggleTheme} isDark={isDark} />
            <Switch>
                <Route exact path="/">
                    {getMainPageRouting()}
                </Route>
                <Route exact path="/top_tracks">
                    <Suspense fallback={<Loading isDark={isDark} />}>
                        {!isLoggedOut ? <TopPage isDark={isDark}></TopPage> : <Redirect to="/"></Redirect>}
                    </Suspense>
                </Route>
                <Route exact path="/privacy">
                    <Suspense fallback={<Loading isDark={isDark} />}>
                        <PrivacyPolicyPage isDark={isDark} />
                    </Suspense>
                </Route>
                <Route exact path="/account">
                    <Suspense fallback={<Loading isDark={isDark} />}>
                        <AccountPage isDark={isDark} />
                    </Suspense>
                </Route>

                <Route>
                    <Suspense fallback={null}>
                        <Page404 />
                    </Suspense>
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

function checkIsDark(): boolean {
    const dark = localStorage.getItem('isDark')

    return dark == 'true' ? true : dark == 'false' ? false : true
}

function checkIsLoggedOut(): boolean {
    return document.cookie.indexOf('state=') == -1 || document.cookie.indexOf('uname=') == -1
}

render(<Main />, document.getElementById('root'))
