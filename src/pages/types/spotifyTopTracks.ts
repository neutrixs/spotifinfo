import spotifyTrackItem from './spotifyTrackItem'

export default interface spotifyTopTracks {
    href: string
    items: spotifyTrackItem[]
    limit: number
    next: string | null
    offset: number
    previous: string | null
    total: number
}
