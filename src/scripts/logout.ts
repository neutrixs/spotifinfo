import * as React from 'react'

export default function logout(self: boolean, e?: React.KeyboardEvent<HTMLParagraphElement>) {
    if (e?.key && e?.key !== 'Enter') return

    localStorage.removeItem('token')
    localStorage.removeItem('validuntil')
    localStorage.removeItem('force')

    eraseCookie('state')
    eraseCookie('uname')

    if (self) {
        localStorage.setItem('force', 'true')
    }
}

function eraseCookie(name: string) {
    document.cookie = name + '=; Max-Age=-99999999;'
}
