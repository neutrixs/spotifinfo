import * as React from 'react'
import getToken from '../../other/getToken'

interface props {
    setShowRecentlyPlayed: React.Dispatch<React.SetStateAction<boolean>>
    setRecentlyPlayedData: React.Dispatch<React.SetStateAction<JSX.Element[]>>
}

export default async function getRecentlyPlayed(props: props) {
    if (!localStorage.getItem('token')) {
        await getToken()
        await getRecentlyPlayed(props)
        return
    }

    const rawResponse = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=50', {
        method: 'GET',
        headers: {
            authorization: localStorage.getItem('token'),
        },
    })

    switch(rawResponse.status){
        case 400:
        case 401:
        case 403:
            await getToken()
            await getRecentlyPlayed(props)
        return
    }

    const data:JSX.Element[] = []

    
}
