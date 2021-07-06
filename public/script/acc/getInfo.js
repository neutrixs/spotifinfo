let accountInfoStack = 0
const getAccountInfo = async function(){
    let res = await fetch('https://api.spotify.com/v1/me',{
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
            accountInfoStack++
            if(accountInfoStack<10) await getAccountInfo();
        }
        return
    }
    $('#accountName').html(res.display_name)
    let temp = `<p class="listAccountInfo">Email: <span class="copy">${res.email}</span></p><p class="listAccountInfo">ID: <span class="copy">${res.id}</span></p><p class="listAccountInfo">Followers: ${res.followers.total}</p><p class="listAccountInfo">Plan: ${res.product=='premium'?'premium':'free'}</p>`
    $('#accountInfo').html($('#accountInfo').html()+temp)
    $('#profilePic').attr('src',res.images[0]?res.images[0].url:'/img/user.png')
    if(!res.images[0]) $('#profilePic').css('box-shadow','none');
}
getAccountInfo()