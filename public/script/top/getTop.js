const getTopTracks = async function(type){
    let createElement = 'createElement' // best for minifier, but doesn't make it hard to code either
    let setAttribute = 'setAttribute'
    let items = 'items'
    let appendChild = 'appendChild'   
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
            await getTopTracks(type);
        }
        return
    }

    document.getElementById(`listTrack${type}`).innerHTML=''

    for(i=0;i<res[items].length;i++){
        let topEach = document[createElement]('div')

        topEach[setAttribute]('id',`listTrack${type}N${i}`)
        topEach[setAttribute]('class','list')

        let listNumber = document[createElement]('div')

        listNumber[setAttribute]('class','listNumber')
        listNumber.innerHTML = i+1

        let albumHolder = document[createElement]('div')

        albumHolder[setAttribute]('id',`listTrack${type}N${i}AlbumHolder`)
        albumHolder[setAttribute]('class','listTrackAlbumHolder')

        let albumImg = document[createElement]('img')

        albumImg[setAttribute]('id',`listTrack${type}N${i}Album`)
        albumImg[setAttribute]('class','listTrackAlbum')
        albumImg[setAttribute]('src',res[items][i].album.images[1].url)

        let infoHolder = document[createElement]('div')

        infoHolder[setAttribute]('id',`listTrack${type}N${i}InfoHolder`)
        infoHolder[setAttribute]('class','listTrackInfoHolder')

        let trackTitle = document[createElement]('div')

        trackTitle[setAttribute]('class','listTrackTitle')
        trackTitle.innerHTML = res[items][i].name

        let trackArtist = document[createElement]('div')

        for(j=0;j<res[items][i].artists.length;j++){
            trackArtist.innerHTML+=res[items][i].artists[j].name

            if(j!= res[items][i].artists.length-1){
                trackArtist.innerHTML+=', '
            }
        }

        infoHolder[appendChild](trackTitle)
        infoHolder[appendChild](trackArtist)

        albumHolder[appendChild](albumImg)

        topEach[appendChild](listNumber)
        topEach[appendChild](albumHolder)
        topEach[appendChild](infoHolder)

        document.getElementById(`listTrack${type}`).appendChild(topEach)
    }

    for(i=0;i<res[items].length;i++){
        $(`#listTrack${type}N${i}AlbumHolder`).off().on('click',{res,i},function(event){
            let url = event.data.res.items[event.data.i].album.external_urls.spotify
            if(isMobile()){
                location.href = url
            }
            else{
                window.open(url)
            }
        })
        $(`#listTrack${type}N${i}InfoHolder`).off().on('click',{res,i},function(event){
            let url = event.data.res.items[event.data.i].external_urls.spotify
            if(isMobile()){
                location.href = url
            }
            else{
                window.open(url)
            }
        })
    }
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
            await getTopArtists(type)
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