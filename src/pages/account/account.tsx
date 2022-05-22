import * as React from 'react'
import { useState, useEffect } from 'react'

import RecaptchaBadge from '../../components/recaptchaBadge/recaptchaBadge'
import Loading from '../../components/loading/loading'
import getToken from '../../scripts/getToken'
import spotifyCurrentUser from '../../types/spotifyCurrentUser'

import useIsMobile from '../../hooks/useIsMobile'

import defaultProfilePic from '../../svg/profile_pic.svg'
import style from './account.module.scss'

export default function AccountPage() {
    const isMobile = useIsMobile(66.5)
    const [isLoading, setIsLoading] = useState(true)

    const [profilePicURL, setProfilePicURL] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [id, setId] = useState('')
    const [followers, setFollowers] = useState(0)
    const [plan, setPlan] = useState('')

    const [isUsingDefaultPFP, setIsUsingDefaultPFP] = useState(false)

    useEffect(() => {
        getData()
    }, [])

    async function getData() {
        const rawResponse = await fetch('https://api.spotify.com/v1/me', {
            method: 'GET',
            headers: {
                Authorization: localStorage.getItem('token'),
            },
        })

        switch (rawResponse.status) {
            case 400:
            case 401:
            case 403:
                await getToken()
                getData()
                return
        }

        const data = (await rawResponse.json()) as spotifyCurrentUser

        setProfilePicURL(data.images[0]?.url ?? defaultProfilePic)

        if (!data.images[0]?.url) {
            setIsUsingDefaultPFP(true)
        }

        setUsername(data.display_name)
        setEmail(data.email)
        setId(data.id)
        setFollowers(data.followers.total)
        setPlan(data.product)

        setIsLoading(false)
    }

    return (
        <div className={style.holder + ' ' + (isMobile ? style.mobile : '')}>
            {isLoading ? <Loading /> : null}
            <div className={style.content} style={{ display: isLoading ? 'none' : '' }}>
                <p className={style.title}>Your Account</p>
                <img src={profilePicURL} style={{ borderRadius: isUsingDefaultPFP ? '50%' : '' }} />
                <div>
                    <p className={style.username}>{username}</p>
                    <p className={style.info}>
                        Email: <span className={style.copy}>{email}</span>
                    </p>
                    <p className={style.info}>
                        ID: <span className={style.copy}>{id}</span>
                    </p>
                    <p className={style.info}>Followers: {followers}</p>
                    <p className={style.info}>Plan: {plan}</p>
                </div>
            </div>
            <RecaptchaBadge />
        </div>
    )
}
