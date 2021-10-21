import * as React from 'react';
import AccountPage from './main'
import spotifyAccountInfo from './types/spotifyAccountInfo'
import {getToken} from '../base/functions'
import defaultProfilePic from '../../svg/profile_pic.svg'

export default async function getAccountInfo(this:AccountPage){
    const res = await fetch('https://api.spotify.com/v1/me',{
        method:'GET',
        headers:{
            Authorization: window.localStorage['token']
        }
    })

    if(res.status == 400 || res.status == 401){
        await getToken()
        getAccountInfo.bind(this)()
        return
    }

    const resData:spotifyAccountInfo = await res.json()

    this.setState({
        profilePicURL:resData.images[0]?.url ?? defaultProfilePic,
        username:resData.display_name
    })
}