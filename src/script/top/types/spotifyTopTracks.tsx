export interface spotifyTopTracks{
    href:string
    items:item
    limit:number
    next:null
    offset:number
    previous:null
    total:number
}

interface item{
    album:{
        album_type:string
        artists:artist[]
        available_markets:string[]
        external_urls:external_urls
        href:string
        id:string
        images:image[]
        name: string
        release_date: string
        release_date_precision: string
        total_tracks: number
        type: string
        uri: string
    }
    artists:artist[]
    available_markets:string[]
    disc_number: number
    duration_ms: number
    explicit: boolean
    external_ids:{
        isrc:string
    }
    external_urls:external_urls
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

interface artist{
    external_urls:external_urls
    href:string
    id:string
    name:string
    type:string
    uri:string
}

interface external_urls{
    spotify:string
}

interface image{
    height:number
    url:string
    width:number
}