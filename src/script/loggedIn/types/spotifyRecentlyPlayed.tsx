interface imagesList{
    height:number
    url:string
    width:number
}

interface artists {
    external_urls: {
        spotify: string
    }
    href: string
    id: string
    name: string
    type: string
    uri: string
}

interface album{
    album_type:string
    artists:Array<artists>
    available_markets:Array<string>
    external_urls:{
        spotify: string
    }
    href:string
    id:string
    images:Array<imagesList>
    name:string
    release_date:string
    release_date_precision:string,
    total_tracks:number
    type:string
    uri:string
}

interface items{
    context:null|string
    played_at:string
    track:{
        album:album
        artists:Array<artists>
        available_markets: Array<string>
        disc_number: number
        duration_ms: number
        explicit: boolean
        external_ids:{
            isrc:string
        }
        external_urls:{
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
}

interface spotifyRecentlyPlayedType{
    items: Array<items>
    next: string
    cursors: {
        after: string
        before: string
    },
    limit: number,
    href: string
}

export {spotifyRecentlyPlayedType, artists}