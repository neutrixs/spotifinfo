import * as React from 'react'
import { useState, useEffect } from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import Navbar from './navbar/navbar'

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

    return (
        <BrowserRouter>
            <div className={'fake ' + (!isDark ? 'fakeLight' : '')}>
                <Navbar isLoggedOut={isLoggedOut} toggleTheme={toggleTheme} isDark={isDark} />
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
