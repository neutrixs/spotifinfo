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

const getProfile = async function(){
    let res, url
    url = 'https://api.spotify.com/v1/me'
    res = await fetch(url,{
        method:'GET',
        headers:{
            'Authorization':window.localStorage['token']
        }
    })
    res = await res.json()
    
    if(res.error){
        if(res.error.status == 401 || res.error.status == 400){
            await getToken()
            let profilePic:string = await getProfile()
            return profilePic
        }
    }

    let profilePic
    if(res.images[0]){
        profilePic = res.images[0].url
    }
    else{
        profilePic = '/img/user.png'
    }

    return profilePic
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

export { getToken, getProfile }