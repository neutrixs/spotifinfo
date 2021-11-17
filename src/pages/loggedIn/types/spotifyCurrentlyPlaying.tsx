interface imagesList{
    height:number
    url:string
    width:number
}

interface artistsList{
    external_urls:{
        spotify:string
    }
    href:string
    id:string
    name:string
    type:string
    uri:string
}

interface spotifyCurrentlyPlayingType{
    context:{
        external_urls:{
            spotify:string
        }
        href:string
        type:string
        uri:string
    }
    timestamp:number
    progress_ms:number
    is_playing:boolean
    currently_playing_type:string
    item:{
        album:{
            album_type:string,
            external_urls:{
                spotify:string
            }
            href:string
            id:string
            images:Array<imagesList>
            name:string
            type:string
            uri:string
        }
        artists:Array<artistsList>
        available_markets: Array<string>
        disc_number: number
        duration_ms: number
        explicit: boolean
        external_ids: {
            isrc: string
        }
        external_urls: {
            spotify: string
        },
        href: string
        id: string
        name: string
        popularity: number
        preview_url: string
        track_number: boolean
        type: string
        uri: string
    }
}

export { spotifyCurrentlyPlayingType }