let topTracksStack = [0,0,0]
let topArtistsStack = [0,0,0]

const getTopTracks = async function(type){
    if(type>2) return

    let res,term,temp
    term = ['long_term','medium_term','short_term']
    res = await fetch('https://api.spotify.com/v1/me/top/tracks?limit=50&time_range='+term[type],{
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
            topTracksStack[type]++
            if(topTracksStack[type]<10)await getTopTracks(type);
        }
        return
    }

    temp = ''

    for(i=0;i<res.items.length;i++){
        temp+=`<div id="listTrack${type}N${i}" class="list"><div class="listNumber">${i+1}</div><div id="listTrack${type}N${i}AlbumHolder" class="listTrackAlbumHolder"><img id="listTrack${type}N${i}Album" class="listTrackAlbum" src="${res.items[i].album.images[1].url}"></div><div id="listTrack${type}N${i}InfoHolder" class="listTrackInfoHolder"><div class="listTrackTitle">${res.items[i].name}</div><div class="listTrackArtist">`
        
        for(j=0;j<res.items[i].artists.length;j++){
            temp+=res.items[i].artists[j].name

            if(j!==res.items[i].artists.length-1){
                temp+=', '
            }
        }
        temp+='</div></div></div>'
    }

    $(`#listTrack${type}`).html(temp)
    temp = ''

    for(i=0;i<res.items.length;i++){
        temp+=`$('#listTrack${type}N${i}AlbumHolder').off().on('click',()=>{url = '${res.items[i].album.external_urls.spotify}';if(isMobile()){location.href = url}else{window.open(url)}});$('#listTrack${type}N${i}InfoHolder').off().on('click',()=>{url = '${res.items[i].external_urls.spotify}';if(isMobile()){location.href = url}else{window.open(url)}})\n`
    }
    eval(temp)
}

const getTopArtists = async function(type){
    if(type>2) return

    let res,term,temp
    term = ['long_term','medium_term','short_term']
    res = await fetch('https://api.spotify.com/v1/me/top/artists?limit=50&time_range='+term[type],{
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
            topArtistsStack[type]++
            if(topArtistsStack[type]<10)await getTopTracks(type)
        }
        return
    }

    temp = ''
    
    for(i=0;i<res.items.length;i++){
        temp+=`<div id="listArtist${type}N${i}" class="list"><div class="listNumber">${i+1}</div><div id="listArtist${type}N${i}ProfileHolder" class="listArtistProfileHolder"><img id="listArtist${type}N${i}Profile" class="listArtistProfile" src="${res.items[i].images[1].url}"></div><div id="listArtist${type}N${i}InfoHolder" class="listArtistInfoHolder"><p id="listArtist${type}N${i}Info" class="listArtistInfo">${res.items[i].name}</p></div></div>`
    }
    $(`#listArtist${type}`).html(temp)
    temp = ''

    for(i=0;i<res.items.length;i++){
        temp+=`$('#listArtist${type}N${i}ProfileHolder').off().on('click',()=>{url = '${res.items[i].external_urls.spotify}';if(isMobile()){location.href = url}else{window.open(url)}});$('#listArtist${type}N${i}InfoHolder').off().on('click',()=>{url = '${res.items[i].external_urls.spotify}';if(isMobile()){location.href = url}else{window.open(url)}})\n`
    }
    eval(temp)
}

getTopTracks(0)
getTopTracks(1)
getTopTracks(2)
getTopArtists(0)
getTopArtists(1)
getTopArtists(2)