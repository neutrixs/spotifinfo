import * as React from 'react'

export default function logout(self: boolean, e?: React.KeyboardEvent<HTMLParagraphElement>) {
    if(e?.key && e?.key !== 'Enter') return

    localStorage.removeItem('token')
    localStorage.removeItem('validuntil')
    localStorage.removeItem('force')

    document.cookie.split(';').forEach(function (c) {
        document.cookie = c.replace(/^ +/, '').replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/')
    })

    if (self) {
        localStorage.setItem('force', 'true')
    }

    location.replace('/')
}
