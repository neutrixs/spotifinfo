/**
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/get-current-users-profile
 */

interface image {
    url: string
    height: number
    width: number
}

export default interface spotifyCurrentUser {
    country?: string
    display_name: string | null
    email?: string
    explicit_content?: {
        filter_enabled: boolean
        filter_locked: boolean
    }
    external_urls: {
        spotify: string
    }
    followers: {
        href: null
        total: number
    }
    href: string
    id: string
    images: image[]
    product?: string
    type: string
    uri: string
}
