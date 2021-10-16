const getToken = async function(){
    if(window.currentFetch){
        for(;window.currentFetch;){
            await sleep(100)
        }
        return
    }
    window.currentFetch = true

    window.grecaptcha.ready(async function(){
        const token = await window.grecaptcha.execute('6Ld9VmMcAAAAAK48XrvY1T8vcjjNBHN4tkRipg5C',{action:'getToken'})

        let res
        res = await fetch('/gettoken?reCAPTCHAToken='+encodeURIComponent(token))
        res = await res.json()

        if(res.relogback){
            logOut(false)
            return
        }
        window.localStorage['token'] = res.data.token
        window.localStorage['validuntil'] = res.data.validuntil

        window.currentFetch = false
    })
}

const sleep = async function(ms:number){
    return new Promise((a,b)=>{
        setTimeout(a,ms)
    })
}

const logOut = function(self:boolean) {
    delete window.localStorage['token']
    delete window.localStorage['validuntil']
    delete window.localStorage['force']
    document.cookie.split(";").forEach(function(c) {
        document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
    if(self){
        window.localStorage['force'] = true
    }
    window.location.replace('/')
}

export { getToken }