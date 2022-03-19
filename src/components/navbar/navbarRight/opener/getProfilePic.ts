import React from 'react'
import getToken from '../../../../scripts/getToken'
import spotifyCurrentUser from '../../../../types/spotifyCurrentUser'

export default async function getProfilePic(setProfilePicURL: React.Dispatch<React.SetStateAction<string>>) {
    const raw = await fetch('https://api.spotify.com/v1/me', {
        headers: {
            Authorization: localStorage.getItem('token') || '',
        },
    })

    switch (raw.status) {
        case 400:
        case 401:
        case 403:
            await getToken()
            await getProfilePic(setProfilePicURL)
            return
    }

    const data = (await raw.json()) as spotifyCurrentUser

    data.images[0]?.url && setProfilePicURL(data.images[0].url)
}
