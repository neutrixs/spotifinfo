import * as React from 'react'
import { useState, useEffect } from 'react'

import RecaptchaBadge from '../../components/recaptchaBadge/recaptchaBadge'

import Loading from '../../components/loading/loading'

import getToken from '../other/getToken'

import spotifyCurrentUser from '../../types/spotifyCurrentUser'

import { mdHandler, mdHandlerBoolean } from '../other/mdHandler'

import defaultProfilePic from '../../svg/profile_pic.svg'

import './account.scss'

interface props {
    isDark: boolean
}

export default function AccountPage({ isDark }: props) {
    const [isMobile, setIsMobile] = useState(mdHandlerBoolean())
    const [isLoading, setIsLoading] = useState(true)

    const [profilePicURL, setProfilePicURL] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [id, setId] = useState('')
    const [followers, setFollowers] = useState(0)
    const [plan, setPlan] = useState('')

    const [isUsingDefaultPFP, setIsUsingDefaultPFP] = useState(false)

    useEffect(() => {
        window.addEventListener('resize', callMdHandler)

        getData()

        return function cleanup() {
            window.removeEventListener('resize', callMdHandler)
        }
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

    function callMdHandler() {
        mdHandler(setIsMobile)
    }

    return (
        <div id="accountPageHolder" className={isMobile ? 'mobile' : ''}>
            {isLoading ? <Loading isDark={isDark} /> : null}
            <div id="content" style={{ display: isLoading ? 'none' : '' }}>
                <p id="title">Your Account</p>
                <img src={profilePicURL} style={{ borderRadius: isUsingDefaultPFP ? '50%' : '' }} />
                <div id="infoHolder">
                    <p id="username">{username}</p>
                    <p className="info">
                        Email: <span className="copy">{email}</span>
                    </p>
                    <p className="info">
                        ID: <span className="copy">{id}</span>
                    </p>
                    <p className="info">Followers: {followers}</p>
                    <p className="info">Plan: {plan}</p>
                </div>
            </div>
            <RecaptchaBadge isDark={isDark} />
        </div>
    )
}
