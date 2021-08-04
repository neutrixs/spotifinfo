(function(){
    let nowPlayingProgress = []
    const getNowPlaying = async function(){
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
                await getNowPlaying();
            }
            return
        }
        let nowPlayingStack=0
    
        if(res.item == null){
            $('#nowPlaying').addClass('none')
            return
        }
    
        if(res.item.name !== he.decode($('#mainTitle').html())){
            getRecentlyPlayed()
            $('#mainPicture').attr('src',res.item.album.images[0].url)
        }
    
        nowPlayingProgress = [res.progress_ms,res.item.duration_ms,res.is_playing]
    
        $('#nowPlayingStatus').html(res.is_playing?'Now Playing:':'Last Played Song:')
    
        if(res.item == null){
            $('#nowPlaying').addClass('none')
        }
        $('#nowPlaying').removeClass('none')
    
        $('#mainPicture').off()
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
    
        let temp = ''
        for(i=0;i<res.item.artists.length;i++){
            temp += `artist${i}url = '${res.item.artists[i].external_urls.spotify}';$('#mainArtist${i}').off().on('click',()=>{if(isMobile()){location.href = artist${i}url}else{window.open(artist${i}url)}})\n`;
        }
        eval(temp)
    
        $('#nowPlaying').removeClass('none')
    }
    if(!isLoggedOut){
        getNowPlaying()
        let nowPlayingInterval = setInterval(getNowPlaying,2000)
    }
    let nowPlayingProgressInterval = setInterval(()=>{
        nowPlayingProgress[0]+=100
    
        if(nowPlayingProgress[1] && nowPlayingProgress[2]){
            let current = nowPlayingProgress[0]
            let total = nowPlayingProgress[1]
    
            let totalMinute = Math.floor(total/60000)
            let totalSecond = (Math.floor(total/1000)%60).toString()
            totalSecond = (totalSecond<10?'0':'')+totalSecond
    
            let currentMinute = Math.floor(current/60000)
            let currentSecond = (Math.floor(current/1000)%60).toString()
            currentSecond = (currentSecond<10?'0':'')+currentSecond
    
            $('#mainProgress').html(currentMinute+':'+currentSecond+' / '+totalMinute+':'+totalSecond)
        }
    },100)
})()
