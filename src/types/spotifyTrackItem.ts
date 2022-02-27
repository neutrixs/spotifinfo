interface image {
    url: string
    height: number
    width: number
}

interface artistInsideAlbum {
    external_urls: {
        spotify: string
    }
    href: string
    id: string
    name: string
    type: 'artist'
    uri: string
}

interface artist {
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

export default interface spotifyTrackItem {
    album: {
        album_type: 'album' | 'single' | 'compilation'
        total_tracks: number
        available_markets: string[]
        external_urls: {
            spotify: string
        }
        href: string
        id: string
        images: image[]
        name: string
        release_date: string
        release_date_precision: 'year' | 'month' | 'day'
        restriction?: {
            reason: string
        }
        type: 'album'
        uri: string
        album_group?: string
        artists: artistInsideAlbum[]
    }
    artists: artist[]
    available_markets: string[]
    disc_number: number
    duration_ms: number
    explicit: boolean
    external_ids: {
        isrc: string
        ean: string
        upc: string
    }
    external_urls: {
        spotify: string
    }
    href: string
    id: string
    is_playable: boolean
    //linked_from:      // i don't use this anyway
    //restrictions:
    name: string
    popularity: number
    preview_url: string
    track_number: number
    type: 'track'
    uri: string
    is_local: boolean
}
