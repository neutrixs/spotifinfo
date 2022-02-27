/**
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/get-information-about-the-users-current-playback
 */

import spotifyTrackItem from './spotifyTrackItem'
export default interface spotifyPlaybackState {
    device: {
        id: string
        is_active: boolean
        is_private_session: boolean
        is_restricted: boolean
        name: string
        type: string
        volume_percent: number
    }
    repeat_state: string
    shuffle_state: string
    context: {
        type: string
        href: string
        external_urls: {
            spotify: string
        }
        uri: string
    }
    timestamp: number
    progress_ms: number
    is_playing: boolean
    item: spotifyTrackItem
    currently_playing_type: 'track' | 'episode' | 'ad' | 'unknown'
    //actions:
}
