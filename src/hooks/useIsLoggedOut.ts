import useCookie from './useCookie'

export default function useIsLoggedOut() {
    const cookies = useCookie()
    const isLoggedOut = !cookies.state

    return isLoggedOut
}
