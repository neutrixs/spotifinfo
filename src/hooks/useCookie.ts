import { useState, useEffect } from 'react'
import getCookie from '../scripts/getCookie'

export default function useCookie() {
    const [cookies, setCookies] = useState(getCookie())

    useEffect(() => {
        function update() {
            const newCookie = getCookie()

            // because objects are compared by reference, it has to be manually compared like this,
            // otherwise it will cause rerender every time this function runs, which is not good

            if (JSON.stringify(newCookie) == JSON.stringify(cookies)) return

            setCookies(newCookie)
        }

        const interval = setInterval(update, 100)

        return () => clearInterval(interval)
    }, [])

    return cookies
}
