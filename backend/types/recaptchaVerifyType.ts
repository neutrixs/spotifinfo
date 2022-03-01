type recaptchaErrors =
    | 'missing-input-secret'
    | 'invalid-input-secret'
    | 'missing-input-response'
    | 'invalid-input-response'
    | 'bad-request'
    | 'timeout-or-duplicate'

interface whenSuccess {
    success: true
    score: number
    action: string
    challenge_ts: string
    hostname: string
}

interface whenFail {
    success: false
    'error-codes': recaptchaErrors[]
}

type recaptchaVerifyType = whenSuccess | whenFail

export default recaptchaVerifyType
