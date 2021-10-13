const getAccountInfo = async function(getToken){
    let baseURL, url
    baseURL = 'https://api.spotify.com/v1/me'
    url = useProxy ? baseProxy+EUC(baseURL) : baseURL
    let res = await fetch(url,{
        method:'GET',
        headers:{
            'Authorization':window.localStorage['token']
        }
    })
    res = await res.json()

    
    if(res.error){
        if(res.error.status == 401 || res.error.status == 400){
            await getToken()
            await getAccountInfo();
        }
        return
    }
    $('#accountName').html(he.encode(res.display_name))

    if(res.images[0]){
        baseURL = res.images[0].url
        url = useProxy ? baseProxy+EUC(baseURL) : baseURL
    }
    else{
        url = '/img/user.png'
    }

    let temp = `<p class="listAccountInfo">Email: <span class="copy">${he.encode(res.email)}</span></p><p class="listAccountInfo">ID: <span class="copy">${res.id}</span></p><p class="listAccountInfo">Followers: ${res.followers.total}</p><p class="listAccountInfo">Plan: ${res.product=='premium'?'premium':'free'}</p>`
    $('#accountInfo').html($('#accountInfo').html()+temp)
    $('#profilePic').attr('src',url)
    if(!res.images[0]) $('#profilePic').css('box-shadow','none');
}

export { getAccountInfo }