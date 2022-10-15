import logout from './logout'
import { fullLoad } from 'grecaptcha-loader'

interface responseData {
    token: string
    validuntil: number
}

interface response {
    success: boolean
    data: responseData | null
    relogback?: boolean
}

let currentlyFetching = false

export default async function getToken() {
    if (currentlyFetching) {
        while (currentlyFetching) {
            await sleep(100)
        }

        return
    }

    currentlyFetching = true

    await fullLoad()

    const token = await window.grecaptcha.execute('6Ld9VmMcAAAAAK48XrvY1T8vcjjNBHN4tkRipg5C', { action: 'getToken' })

    const postParam = new URLSearchParams()
    postParam.append('reCAPTCHAToken', token)

    const rawResponse = await fetch('/api/gettoken', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: postParam.toString(),
    })

    if (rawResponse.status >= 500) return

    const dataResponse = (await rawResponse.json()) as response

    if (dataResponse.relogback) {
        logout(false)
        return
    }

    localStorage.setItem('token', dataResponse.data?.token || '')
    localStorage.setItem('validuntil', dataResponse.data?.validuntil.toString() || '')

    currentlyFetching = false
}

function sleep(ms: number) {
    return new Promise(a => {
        setTimeout(a, ms)
    })
}
