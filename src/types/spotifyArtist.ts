interface image {
    url: string
    height: number
    width: number
}

export default interface spotifyArtist {
    external_urls: {
        spotify: string
    }
    followers: {
        href: null
        total: number
    }
    genres: string[]
    href: string
    id: string
    images: image[]
    name: string
    popularity: number
    type: 'artist'
    uri: string
}
