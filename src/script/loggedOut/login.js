const loginHandler = function(encodeQueryString){
    $('#profile_h').on('click',function(){
        grecaptcha.ready(function(){
            grecaptcha.execute('6Ld9VmMcAAAAAK48XrvY1T8vcjjNBHN4tkRipg5C',{action:'loginClick'}).then(function(token){
                loginParam.reCAPTCHAToken = token
                let parsedParam = encodeQueryString(loginParam)

                location.href = '/login?'+parsedParam
            })
        })
    })
}

export { loginHandler }