(function(){let nowPlayingProgress=[];const getNowPlaying=async function(){let res=await fetch("https://api.spotify.com/v1/me/player/currently-playing",{method:"GET",headers:{Authorization:window.localStorage.token}});if(res=await res.json(),res.error)return void((400==res.error.status||401==res.error.status)&&(await getToken(),await getNowPlaying()));if(nowPlayingStack=0,null==res.item)return void $("#nowPlaying").addClass("none");res.item.name!==he.decode($("#mainTitle").html())&&(getRecentlyPlayed(),$("#mainPicture").attr("src",res.item.album.images[0].url)),nowPlayingProgress=[res.progress_ms,res.item.duration_ms,res.is_playing],$("#nowPlayingStatus").html(res.is_playing?"Now Playing:":"Last Played Song:"),null==res.item&&$("#nowPlaying").addClass("none"),$("#nowPlaying").removeClass("none"),$("#mainPicture").off().on("click",function(){isMobile()?location.href=res.item.album.external_urls.spotify:window.open(res.item.album.external_urls.spotify)}),$("#mainTitle").html(res.item.name).off().on("click",function(){isMobile()?location.href=res.item.external_urls.spotify:window.open(res.item.external_urls.spotify)});let artist="";for(i=0;i<res.item.artists.length;i++)artist+=`<span id="mainArtist${i}" class="pointer">${res.item.artists[i].name}</span>`,i<res.item.artists.length-1&&(artist+=", ");for($("#mainArtist").html(artist),temp="",i=0;i<res.item.artists.length;i++)temp+=`artist${i}url = '${res.item.artists[i].external_urls.spotify}';$('#mainArtist${i}').off().on('click',()=>{if(isMobile()){location.href = artist${i}url}else{window.open(artist${i}url)}})\n`;eval(temp),$("#nowPlaying").removeClass("none")};isLoggedOut||(getNowPlaying(),nowPlayingInterval=setInterval(getNowPlaying,2e3));let nowPlayingProgressInterval=setInterval(()=>{var a=Math.floor;if(nowPlayingProgress[0]+=100,nowPlayingProgress[1]&&nowPlayingProgress[2]){let b=nowPlayingProgress[0],c=nowPlayingProgress[1],d=a(c/6e4),e=(a(c/1e3)%60).toString();e=(10>e?"0":"")+e;let f=a(b/6e4),g=(a(b/1e3)%60).toString();g=(10>g?"0":"")+g,$("#mainProgress").html(f+":"+g+" / "+d+":"+e)}},100)})();