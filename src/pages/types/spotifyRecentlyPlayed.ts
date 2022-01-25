interface image {
    height: number
    width: number
    url: string
}

interface artist {
    external_urls: {
        spotify: string
    }
    href: string
    id: string
    name: string
    type: 'artist'
    uri: string
}

interface track {
    album: {
        album_type: string
        artists: artist[]
        available_markets: string[]
        external_urls: {
            spotify: string
        }
        href: string
        id: string
        images: image[]
        name: string
        release_date: string
        release_date_precision: string
        total_tracks: number
        type: 'album'
        uri: string
    }
    artists: artist[]
    available_markets: string[]
    disc_number: number
    duration_ms: number
    explicit: boolean
    external_ids: {
        isrc: string
    }
    external_urls: {
        spotify: string
    }
    href: string
    id: string
    is_local: boolean
    name: string
    popularity: number
    preview_url: string
    track_number: number
    type: string
    uri: string
}

interface item {
    context: null // idk? the docs doesn't even say what "item" is
    played_at: string
    track: track
}

export default interface spotifyRecentlyPlayed {
    cursors: {
        after: string
        before: string
    }
    href: string
    items: item[]
    limit: number
    next: string
}
