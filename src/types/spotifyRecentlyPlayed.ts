import spotifyTrackItem from './spotifyTrackItem'

interface item {
    context: null // idk? the docs doesn't even say what "item" is
    played_at: string
    track: spotifyTrackItem
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
