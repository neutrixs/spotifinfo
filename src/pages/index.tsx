import * as React from 'react'
import { useState, useEffect, lazy, Suspense } from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Navbar from './navbar/navbar'

const MainPageOut = lazy(() => import('./mainPageOut/mainPageOut'))

import './base.scss'

function Main() {
    const isLoggedOut = checkIsLoggedOut()

    const [isDark, setIsDark] = useState<boolean>(checkIsDark())
    const toggleTheme = () => {
        setIsDark(!isDark)
    }

    useEffect(() => {
        localStorage.setItem('isDark', isDark.toString())
    }, [])

    function getMainPageRouting() {
        if (isLoggedOut) {
            return (
                <Suspense fallback={null}>
                    <MainPageOut />
                </Suspense>
            )
        }

        //TODO: add mainPageIn
    }

    return (
        <BrowserRouter>
            <div className={'fake ' + (!isDark ? 'fakeLight' : '')}>
                <Navbar isLoggedOut={isLoggedOut} toggleTheme={toggleTheme} isDark={isDark} />
                <Switch>
                    <Route exact path="/">
                        {getMainPageRouting()}
                    </Route>
                </Switch>
            </div>
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
