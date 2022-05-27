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
    const [data, setData] = useState<spotifyCurrentUser | null>(null)

    useEffect(() => {
        getData()
    }, [])

    async function getData(): Promise<void> {
        const token = localStorage.getItem('token')

        if (!token) {
            await getToken()
            return getData()
        }

        const response = await fetch('https://api.spotify.com/v1/me', {
            method: 'GET',
            headers: {
                Authorization: token,
            },
        })

        switch (response.status) {
            case 400:
            case 401:
            case 403:
                await getToken()
                return getData()
        }

        const parsedData = (await response.json()) as spotifyCurrentUser

        setData(parsedData)
    }

    const profilePicURL = data?.images[0]?.url
    const dataElement = (
        <div className={style.content}>
            <p className={style.title}>Your Account</p>
            <img src={profilePicURL ?? defaultProfilePic} style={{ borderRadius: !profilePicURL ? '50%' : '' }} />
            <div>
                <p className={style.username}>{data?.display_name ?? 'unknown'}</p>
                <p className={style.info}>
                    Email: <span className={style.copy}>{data?.email ?? 'unknown'}</span>
                </p>
                <p className={style.info}>
                    ID: <span className={style.copy}>{data?.id ?? 'unknown'}</span>
                </p>
                <p className={style.info}>Followers: {data?.followers.total ?? 'unknown'}</p>
                <p className={style.info}>Plan: {data?.product ?? 'unknown'}</p>
            </div>
        </div>
    )

    return (
        <div className={style.holder + ' ' + (isMobile ? style.mobile : '')}>
            {data ? dataElement : <Loading />}
            <RecaptchaBadge />
        </div>
    )
}
