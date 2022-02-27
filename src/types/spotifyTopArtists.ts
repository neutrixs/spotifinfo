import spotifyArtist from './spotifyArtist'

export default interface spotifyTopArtists {
    href: string
    items: spotifyArtist[]
    limit: number
    next: string | null
    offset: number
    previous: string | null
    total: number
}
