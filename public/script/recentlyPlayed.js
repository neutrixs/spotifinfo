let recentlyPlayedStack = 0
const getRecentlyPlayed = async function(){
    let res = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=50',{
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
            recentlyPlayedStack++
            if(recentlyPlayedStack<10) await getRecentlyPlayed();
        }
        return
    }

    let temp = ''
    for(i=0;i<res.items.length;i++){
        temp+=`<div id="RecentlyPlayed${i}" class="listRecentlyPlayed"><div id="recentlyPlayed${i}ImageHolder" class="recentlyPlayedImageHolder"><img class="recentlyPlayedImage" src="${res.items[i].track.album.images[1].url}"></div><div id="recentlyPlayed${i}InfoHolder" class="recentlyPlayedInfoHolder"><p class="recentlyPlayedSongName">${res.items[i].track.name}</p><p class="recentlyPlayedArtistName">`
        for(j=0;j<res.items[i].track.artists.length;j++){
            temp+=`<span id="recent${i}artist${j}">${res.items[i].track.artists[j].name}</span>`

            if(j !== res.items[i].track.artists.length-1){
                temp+=', '
            }
        }
        temp+='</p></div></div>'
    }
    $('#recentlyPlayedListHolder').html(temp)

    temp = ''
    for(i=0;i<res.items.length;i++){
        temp+=`$('#recentlyPlayed${i}InfoHolder').off().on('click',()=>{url = '${res.items[i].track.external_urls.spotify}';if(isMobile()){location.href = url}else{window.open(url)}});$('#recentlyPlayed${i}ImageHolder').off().on('click',()=>{url = '${res.items[i].track.album.external_urls.spotify}';if(isMobile()){location.href = url}else{window.open(url)}})\n`
    }
    eval(temp)

    $('#recentlyPlayed').removeClass('none')
}
getRecentlyPlayed()