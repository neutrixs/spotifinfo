function nowPlayingStart(getRecentlyPlayed,getToken){
    let nowPlayingProgress = []
    const getNowPlaying = async function(){
        let baseURL, url
        baseURL = 'https://api.spotify.com/v1/me/player/currently-playing'
        url = useProxy ? baseProxy+EUC(baseURL) : baseURL
        let res = await fetch(url,{
            method:'GET',
            headers:{
                'Authorization':window.localStorage['token']
            }
        })

        if(res.status == 204){
            $('#nowPlaying').addClass('none')
            return
        }

        res = await res.json()
    
        if(res.error){
            if(res.error.status == 400 || res.error.status == 401){
                await getToken()
                await getNowPlaying();
            }
            return
        }
    
        if(res.item == null){
            $('#nowPlaying').addClass('none')
            return
        }
    
        if(res.item.name !== he.decode($('#mainTitle').html())){
            getRecentlyPlayed(getToken)
            baseURL = res.item.album.images[0].url
            url = useProxy ? baseProxy+EUC(baseURL) : baseURL
            $('#mainPicture').attr('src',url)
        }
    
        nowPlayingProgress = [res.progress_ms,res.item.duration_ms,res.is_playing]
    
        $('#nowPlayingStatus').html(res.is_playing?'Now Playing:':'Last Played Song:')
    
        if(res.item == null){
            $('#nowPlaying').addClass('none')
        }
        $('#nowPlaying').removeClass('none')
    
        $('#mainPictureHold').attr('href',res.item.album.external_urls.spotify)
    
        $('#mainTitle').html(he.encode(res.item.name))
        .attr('href',res.item.external_urls.spotify)
    
        let artist = ''
        for(let i=0;i<res.item.artists.length;i++){
            artist+=`<a href="${res.item.artists[i].external_urls.spotify}" id="mainArtist${i}">${he.encode(res.item.artists[i].name)}</a>`
            if(i < res.item.artists.length-1){
                artist+=', '
            }
        }
        $('#mainArtist').html(artist)
    
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
}

export { nowPlayingStart }