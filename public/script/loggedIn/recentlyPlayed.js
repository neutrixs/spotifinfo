const getRecentlyPlayed = async function(){
    let createElement = 'createElement' // best for minifier, but doesn't make it hard to code either
    let setAttribute = 'setAttribute'
    let items = 'items'
    let track = 'track'
    let appendChild = 'appendChild'    

    let baseURL, url
    baseURL = 'https://api.spotify.com/v1/me/player/recently-played?limit=50'
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
            await getRecentlyPlayed();
        }
        return
    }

    $('#recentlyPlayedListHolder').html('')

    for(i=0;i<res[items].length;i++){
        let recentlyPlayedEach = document[createElement]('div')
        
        recentlyPlayedEach[setAttribute]('id','RecentlyPlayed'+i)
        recentlyPlayedEach[setAttribute]('class','listRecentlyPlayed')

        let recentlyPlayedImageHolder = document[createElement]('div')
            
        recentlyPlayedImageHolder[setAttribute]('id','recentlyPlayed'+i+'ImageHolder')
        recentlyPlayedImageHolder[setAttribute]('class','recentlyPlayedImageHolder')

        let recentlyPlayedImage = document[createElement]('img')

        baseURL = res[items][i][track].album.images[1].url
        url = useProxy ? baseProxy+EUC(baseURL) : baseURL
            
        recentlyPlayedImage[setAttribute]('class','recentlyPlayedImage')
        recentlyPlayedImage[setAttribute]('src',url)

        let recentlyPlayedInfoHolder = document[createElement]('div')
        
        recentlyPlayedInfoHolder[setAttribute]('id','recentlyPlayed'+i+'InfoHolder')
        recentlyPlayedInfoHolder[setAttribute]('class','recentlyPlayedInfoHolder')

        let recentlyPlayedSongName = document[createElement]('p')
        
        recentlyPlayedSongName[setAttribute]('class','recentlyPlayedSongName')
        recentlyPlayedSongName.innerHTML = he.encode(res[items][i][track].name)
        
        let recentlyPlayedArtistName = document[createElement]('p')
            
        recentlyPlayedArtistName[setAttribute]('class','recentlyPlayedArtistName')
        
        for(j=0;j<res[items][i][track].artists.length;j++){
            let each = document[createElement]('span')
                
            each[setAttribute]('id','recent'+i+'artist'+j)
            each.innerHTML = he.encode(res[items][i][track].artists[j].name)

            recentlyPlayedArtistName[appendChild](each)

            if(j!= res[items][i][track].artists.length-1){
                let each = document[createElement]('span')
                each.innerHTML = ', '

                recentlyPlayedArtistName[appendChild](each)
            }
        }

        recentlyPlayedInfoHolder[appendChild](recentlyPlayedSongName)
        recentlyPlayedInfoHolder[appendChild](recentlyPlayedArtistName)
        recentlyPlayedImageHolder[appendChild](recentlyPlayedImage)
        recentlyPlayedEach[appendChild](recentlyPlayedImageHolder)
        recentlyPlayedEach[appendChild](recentlyPlayedInfoHolder)

        let listHolder = document.getElementById('recentlyPlayedListHolder')
        listHolder[appendChild](recentlyPlayedEach)
    }

    for(i=0;i<res[items].length;i++){
        $(`#recentlyPlayed${i}InfoHolder`).off().on('click',{res:{...res},i:i},(event)=>{
            let url = event.data.res.items[event.data.i].track.external_urls.spotify
            if(isMobile()){
                location.href = url
            }
            else{
                window.open(url)
            }
        })
        $(`#recentlyPlayed${i}ImageHolder`).off().on('click',{res:{...res},i:i},(event)=>{
            let url = event.data.res.items[event.data.i].track.album.external_urls.spotify
            if(isMobile()){
                location.href = url
            }
            else{
                window.open(url)
            }
        })
    }

    $('#recentlyPlayed').removeClass('none')
}
if(!isLoggedOut)getRecentlyPlayed();