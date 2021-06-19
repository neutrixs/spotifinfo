let nowPlayingProgress = []
getNowPlaying = async function(){
    let res = await fetch('https://api.spotify.com/v1/me/player/currently-playing',{
        method:'GET',
        headers:{
            'Authorization':window.localStorage['token']
        }
    })
    res = await res.json()

    if(res.error){
        if(res.error.status == 400 || res.error.status == 401){
            await getToken()
            await getNowPlaying()
            return
        }
    }

    $('#nowPlayingStatus').html(res.is_playing?'Now Playing:':'Last Played Song:')

    if(res.item == null){
        $('#nowPlaying').addClass('none')
    }
    $('#nowPlaying').removeClass('none')

    $('#mainPicture').attr('src',res.item.album.images[0].url)
    .off()
    .on('click',function(){
        if(isMobile()){
            location.href = res.item.album.external_urls.spotify
        }
        else{
            window.open(res.item.album.external_urls.spotify)
        }
    })

    $('#mainTitle').html(res.item.name)
    .off()
    .on('click',function(){
        if(isMobile()){
            location.href = res.item.external_urls.spotify
        }
        else{
            window.open(res.item.external_urls.spotify)
        }
    })

    let artist = ''
    for(i=0;i<res.item.artists.length;i++){
        artist+=`<span id="mainArtist${i}" class="pointer">${res.item.artists[i].name}</span>`
        if(i < res.item.artists.length-1){
            artist+=', '
        }
    }
    $('#mainArtist').html(artist)
}

getNowPlaying()
nowPlayingInterval = setInterval(getNowPlaying,2000)