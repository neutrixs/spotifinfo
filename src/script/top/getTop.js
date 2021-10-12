const getTop = function(globalVar,getToken){    
    const getTopTracks = async function(type){
        let createElement = 'createElement' // best for minifier, but doesn't make it hard to code either
        let setAttribute = 'setAttribute'
        let items = 'items'
        let appendChild = 'appendChild'   
        if(type>2) return

        let res,term,temp, baseURL, url
        term = ['long_term','medium_term','short_term']
        baseURL = 'https://api.spotify.com/v1/me/top/tracks?limit=50&time_range='+term[type]
        url = globalVar.useProxy ? globalVar.baseProxy+globalVar.EUC(baseURL) : baseURL
        res = await fetch(url,{
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

        for(let i=0;i<res[items].length;i++){
            let topEach = document[createElement]('div')

            topEach[setAttribute]('id',`listTrack${type}N${i}`)
            topEach[setAttribute]('class','list')

            let listNumber = document[createElement]('div')

            listNumber[setAttribute]('class','listNumber')
            listNumber.innerHTML = i+1

            let albumHolder = document[createElement]('a')

            albumHolder[setAttribute]('id',`listTrack${type}N${i}AlbumHolder`)
            albumHolder[setAttribute]('class','listTrackAlbumHolder')
            albumHolder[setAttribute]('href',res[items][i].album.external_urls.spotify)

            let albumImg = document[createElement]('img')

            baseURL = res[items][i].album.images[1].url
            url = globalVar.useProxy ? globalVar.baseProxy+globalVar.EUC(baseURL) : baseURL

            albumImg[setAttribute]('id',`listTrack${type}N${i}Album`)
            albumImg[setAttribute]('class','listTrackAlbum')
            albumImg[setAttribute]('src',url)

            let infoHolder = document[createElement]('a')

            infoHolder[setAttribute]('id',`listTrack${type}N${i}InfoHolder`)
            infoHolder[setAttribute]('class','listTrackInfoHolder')
            infoHolder[setAttribute]('href',res[items][i].external_urls.spotify)

            let trackTitle = document[createElement]('div')

            trackTitle[setAttribute]('class','listTrackTitle')
            trackTitle.innerHTML = he.encode(res[items][i].name)

            let trackArtist = document[createElement]('div')

            trackArtist[setAttribute]('class','listTrackArtist')

            for(let j=0;j<res[items][i].artists.length;j++){
                trackArtist.innerHTML+=he.encode(res[items][i].artists[j].name)

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

            document.getElementById(`listTrack${type}`)[appendChild](topEach)
        }
    }

    const getTopArtists = async function(type){
        let createElement = 'createElement' // best for minifier, but doesn't make it hard to code either
        let setAttribute = 'setAttribute'
        let items = 'items'
        let appendChild = 'appendChild'  
        if(type>2) return

        let res,term,temp, baseURL, url
        term = ['long_term','medium_term','short_term']
        baseURL = 'https://api.spotify.com/v1/me/top/artists?limit=50&time_range='+term[type]
        url = globalVar.useProxy ? globalVar.baseProxy+globalVar.EUC(baseURL) : baseURL
        res = await fetch(url,{
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
        
        document.getElementById(`listArtist${type}`).innerHTML = ''

        for(let i=0;i<res[items].length;i++){
            let artistEach = document[createElement]('div')

            artistEach[setAttribute]('id',`listArtist${type}N${i}`)
            artistEach[setAttribute]('class','list')

            let listNumber = document[createElement]('div')

            listNumber[setAttribute]('class','listNumber')
            listNumber.innerHTML = i+1

            let profileHolder = document[createElement]('a')

            profileHolder[setAttribute]('id',`listArtist${type}N${i}ProfileHolder`)
            profileHolder[setAttribute]('class','listArtistProfileHolder')
            profileHolder[setAttribute]('href',res[items][i].external_urls.spotify)

            let profile = document[createElement]('img')

            baseURL = res[items][i].images[1].url
            url = globalVar.useProxy ? globalVar.baseProxy+globalVar.EUC(baseURL) : baseURL

            profile[setAttribute]('id',`listArtist${type}N${i}Profile`)
            profile[setAttribute]('class',`listArtistProfile`)
            profile[setAttribute]('src',url)

            let infoHolder = document[createElement]('a')

            infoHolder[setAttribute]('id',`listArtist${type}N${i}InfoHolder`)
            infoHolder[setAttribute]('class','listArtistInfoHolder')
            infoHolder[setAttribute]('href',res[items][i].external_urls.spotify)

            let artistName = document[createElement]('p')

            artistName[setAttribute]('id',`listArtist${type}N${i}Info`)
            artistName[setAttribute]('class','listArtistInfo')
            artistName.innerHTML = he.encode(res[items][i].name)

            profileHolder[appendChild](profile)
            infoHolder[appendChild](artistName)
            artistEach[appendChild](listNumber)
            artistEach[appendChild](profileHolder)
            artistEach[appendChild](infoHolder)

            document.getElementById(`listArtist${type}`)[appendChild](artistEach)
        }
    }

    getTopTracks(0)
    getTopTracks(1)
    getTopTracks(2)
    getTopArtists(0)
    getTopArtists(1)
    getTopArtists(2)
}

export { getTop }