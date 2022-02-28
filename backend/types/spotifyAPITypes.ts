interface requestRefreshToken {
    access_token: string
    token_type: string
    scope: string
    expires_in: number
}

interface requestAccessToken extends requestRefreshToken {
    refresh_token: string
}

export { requestRefreshToken, requestAccessToken }
