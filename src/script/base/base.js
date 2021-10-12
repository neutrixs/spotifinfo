let globalVar = {} //ways to store data by references (because i'm lazy)
const EUC = globalVar.EUC = encodeURIComponent
const baseProxy = globalVar.baseProxy = '/proxy?url='
let currentFetch = globalVar.currentFetch = false
let useProxy = globalVar.useProxy = false

if(window.localStorage.proxy){
    useProxy = JSON.parse(window.localStorage.proxy) === true
}
console.log(useProxy)

const sleep = async function(ms){
    return new Promise((a,b)=>{
        setTimeout(a,ms)
    })
}

const getToken = async function(){
    if(currentFetch){
        for(;currentFetch;){
            await sleep(100)
        }
        return
    }
    currentFetch = true

    grecaptcha.ready(async function(){
        const token = await grecaptcha.execute('6Ld9VmMcAAAAAK48XrvY1T8vcjjNBHN4tkRipg5C',{action:'getToken'})

        let res
        res = await fetch('/gettoken?reCAPTCHAToken='+encodeURIComponent(token))
        res = await res.json()

        if(res.relogback){
            logOut(false)
            return
        }
        window.localStorage['token'] = res.data.token
        window.localStorage['validuntil'] = res.data.validuntil

        currentFetch = false
    })
}
const getProfile = async function(){
    let res, baseURL, url
    baseURL = 'https://api.spotify.com/v1/me'
    url = useProxy ? baseProxy+EUC(baseURL) : baseURL
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
            await sleep(1000)
            await getProfile()
        }
        return
    }

    let profilePic
    if(res.images[0]){
        baseURL = res.images[0].url
        url = useProxy ? baseProxy+EUC(baseURL) : baseURL
        profilePic = url
    }
    else{
        profilePic = '/img/user.png'
    }

    $('#profile').attr('src',profilePic)
}
const logOut = function(self) {
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

const unsetHidden = function(){
    $('body').css('display','unset')
}

let isDropdownOpened = false
const dropdown = function(){
    if(isDropdownOpened){
        $('#dropdown').removeClass('r180')
        $('#dropdown_options').addClass('none')
        isDropdownOpened = false
    }
    else{
        $('#dropdown').addClass('r180')
        $('#dropdown_options').removeClass('none')
        isDropdownOpened = true
    }
}

let isDropdownLocked = false
function baseStart(){
    $('#profile_h').click(function(){
        isDropdownLocked = true
        dropdown()
    })

    $('#dropdown_options').click(function(){
        isDropdownLocked = true
    })

    $('#logout').click(function(){
        logOut(true)
    })

    $(window).click(function(){
        if(isDropdownLocked){
            isDropdownLocked = false
            return
        }
        if(isDropdownOpened){
            dropdown()
        }
    })

    if(!isLoggedOut){
        getProfile()
    }
}

export {
    globalVar,
    sleep,
    getToken,
    getProfile,
    logOut,
    baseStart,
    unsetHidden
}