currentFetch = false

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

    let res
    res = await fetch('/gettoken')
    res = await res.json()

    if(res.relogback){
        return
    }
    window.localStorage['token'] = res.data.token
    window.localStorage['validuntil'] = res.data.validuntil

    currentFetch = false
}
const getProfile = async function(){
    let res
    res = await fetch('https://api.spotify.com/v1/me',{
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
        profilePic = res.images[0].url
    }
    else{
        profilePic = '/img/user.png'
    }

    $('#profile').attr('src',profilePic)
}

isDropdownOpened = false
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

isDropdownLocked = false
$('#profile_h').click(function(){
    isDropdownLocked = true
    dropdown()
})

$('#dropdown_options').click(function(){
    isDropdownLocked = true
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