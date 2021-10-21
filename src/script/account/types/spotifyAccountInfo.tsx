export default interface spotifyAccountInfo{
    country: string
    display_name: string
    email: string
    explicity_content: {
        filter_enabled: boolean
        filter_locked: boolean
    }
    external_urls: {
        spotify:string
    }
    followers:{
        href:null
        total:number
    }
    href:string
    id:string
    images: image[]
    product: 'premium' | 'open'
    type:string
    uri:string
}

interface image{
    height:null|number
    url:string
    width:null|number
}