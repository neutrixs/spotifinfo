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
            await getTopTracks()
        }
        return
    }

    temp = ''

    for(i=0;i<res.items.length;i++){
        temp+=`<div id="listTrack${type}N${i}" class="list">
            <div class="listNumber">${i+1}</div>
            <div id="listTrack${type}N${i}AlbumHolder" class="listTrackAlbumHolder">
                <img id="listTrack${type}N${i}Album" class="listTrackAlbum" src="${res.items[i].album.images[1].url}">
            </div>
            <div id="listTrack${type}N${i}InfoHolder" class="listTrackInfoHolder">
                <div class="listTrackTitle">${res.items[i].name}</div>
                <div class="listTrackArtist">`
        
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
}