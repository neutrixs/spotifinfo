let t=!1;const e=async function(i){return new Promise((e,t)=>{setTimeout(e,i)})},l=async function(){if(t)for(;t;)await e(100);else{t=!0;let e;e=await fetch("/gettoken"),e=await e.json(),e.relogback?s(!1):(window.localStorage.token=e.data.token,window.localStorage.validuntil=e.data.validuntil,t=!1)}},o=async function(){let t;if(t=await fetch("https://api.spotify.com/v1/me",{method:"GET",headers:{Authorization:window.localStorage.token}}),t=await t.json(),t.error)401!=t.error.status&&400!=t.error.status||(await l(),await e(1e3),await o());else{let e;e=t.images[0]?t.images[0].url:"/img/user.png",$("#profile").attr("src",e)}},s=function(e){delete window.localStorage.token,delete window.localStorage.validuntil,delete window.localStorage.force,document.cookie.split(";").forEach(function(e){document.cookie=e.replace(/^ +/,"").replace(/=.*/,"=;expires="+(new Date).toUTCString()+";path=/")}),e&&(window.localStorage.force=!0),window.location.replace("/")};let a=!1;const r=function(){a=a?($("#dropdown").removeClass("r180"),$("#dropdown_options").addClass("none"),!1):($("#dropdown").addClass("r180"),$("#dropdown_options").removeClass("none"),!0)};let n=!1;$("#profile_h").click(function(){n=!0,r()}),$("#dropdown_options").click(function(){n=!0}),$("#logout").click(function(){s(!0)}),$(window).click(function(){n?n=!1:a&&r()}),isLoggedOut||o();const d=function(){$("#holder").addClass("margin0")},c=function(){$("#holder").removeClass("margin0")};let m=44.5;$(window).width()/parseFloat($("body").css("font-size"))<m&&d(),$("#holder").removeClass("none").addClass("ts300ms"),window.onresize=function(){this.innerWidth;($(window).width()/parseFloat($("body").css("font-size"))<m?d:c)()};const h=async function(d){var c="createElement",m="setAttribute",f="items",w="appendChild";if(!(2<d)){let n;if(n=await fetch("https://api.spotify.com/v1/me/top/tracks?limit=50&time_range="+["long_term","medium_term","short_term"][d],{method:"GET",headers:{Authorization:window.localStorage.token}}),n=await n.json(),n.error)401!=n.error.status&&400!=n.error.status||(await l(),await h(d));else{for(document.getElementById(`listTrack${d}`).innerHTML="",i=0;i<n[f].length;i++){let e=document[c]("div");e[m]("id",`listTrack${d}N${i}`),e[m]("class","list");let t=document[c]("div");t[m]("class","listNumber"),t.innerHTML=i+1;let o=document[c]("div");o[m]("id",`listTrack${d}N${i}AlbumHolder`),o[m]("class","listTrackAlbumHolder");let s=document[c]("img");s[m]("id",`listTrack${d}N${i}Album`),s[m]("class","listTrackAlbum"),s[m]("src",n[f][i].album.images[1].url);let l=document[c]("div");l[m]("id",`listTrack${d}N${i}InfoHolder`),l[m]("class","listTrackInfoHolder");let a=document[c]("div");a[m]("class","listTrackTitle"),a.innerHTML=n[f][i].name;let r=document[c]("div");for(j=0;j<n[f][i].artists.length;j++)r.innerHTML+=n[f][i].artists[j].name,j!=n[f][i].artists.length-1&&(r.innerHTML+=", ");l[w](a),l[w](r),o[w](s),e[w](t),e[w](o),e[w](l),document.getElementById(`listTrack${d}`).appendChild(e)}for(i=0;i<n[f].length;i++)$(`#listTrack${d}N${i}AlbumHolder`).off().on("click",{res:n,i:i},function(e){e=e.data.res.items[e.data.i].album.external_urls.spotify;isMobile()?location.href=e:window.open(e)}),$(`#listTrack${d}N${i}InfoHolder`).off().on("click",{res:n,i:i},function(e){e=e.data.res.items[e.data.i].external_urls.spotify;isMobile()?location.href=e:window.open(e)})}}},f=async function(s){if(!(2<s)){let e,t,o;if(t=["long_term","medium_term","short_term"],e=await fetch("https://api.spotify.com/v1/me/top/artists?limit=50&time_range="+t[s],{method:"GET",headers:{Authorization:window.localStorage.token}}),e=await e.json(),e.error)401!=e.error.status&&400!=e.error.status||(await l(),await f(s));else{for(o="",i=0;i<e.items.length;i++)o+=`<div id="listArtist${s}N${i}" class="list"><div class="listNumber">${i+1}</div><div id="listArtist${s}N${i}ProfileHolder" class="listArtistProfileHolder"><img id="listArtist${s}N${i}Profile" class="listArtistProfile" src="${e.items[i].images[1].url}"></div><div id="listArtist${s}N${i}InfoHolder" class="listArtistInfoHolder"><p id="listArtist${s}N${i}Info" class="listArtistInfo">${e.items[i].name}</p></div></div>`;for($(`#listArtist${s}`).html(o),o="",i=0;i<e.items.length;i++)o+=`$('#listArtist${s}N${i}ProfileHolder').off().on('click',()=>{url = '${e.items[i].external_urls.spotify}';if(isMobile()){location.href = url}else{window.open(url)}});$('#listArtist${s}N${i}InfoHolder').off().on('click',()=>{url = '${e.items[i].external_urls.spotify}';if(isMobile()){location.href = url}else{window.open(url)}})\n`;eval(o)}}};h(0),h(1),h(2),f(0),f(1),f(2);let w=0,u=0;const g=function(e){let t=!1;"false"==window.localStorage.dark&&(t=!0);$("#listTrack").addClass("none"),$("#listArtist").addClass("none"),$(`#list${["Track","Artist"][e]}`).removeClass("none"),w=e,$("#trackSelector").removeClass("selected").removeClass("selectedLight"),$("#artistSelector").removeClass("selected").removeClass("selectedLight"),$(`#${["track","artist"][e]}Selector`).addClass(t?"selectedLight":"selected")},p=function(e){let t=!1;"false"==window.localStorage.dark&&(t=!0),$("#listTrack0").addClass("none"),$("#listTrack1").addClass("none"),$("#listTrack2").addClass("none"),$("#listArtist0").addClass("none"),$("#listArtist1").addClass("none"),$("#listArtist2").addClass("none"),$(`#listTrack${e}`).removeClass("none"),$(`#listArtist${e}`).removeClass("none"),$("#timeSelector0").removeClass("selected").removeClass("selectedLight"),$("#timeSelector1").removeClass("selected").removeClass("selectedLight"),$("#timeSelector2").removeClass("selected").removeClass("selectedLight"),$(`#timeSelector${e}`).addClass(t?"selectedLight":"selected"),u=e};$("#trackSelector").off().on("click",()=>{g(0)}),$("#artistSelector").off().on("click",()=>{g(1)}),$("#timeSelector0").off().on("click",()=>{p(0)}),$("#timeSelector1").off().on("click",()=>{p(1)}),$("#timeSelector2").off().on("click",()=>{p(2)});const k=function(){if("false"==window.localStorage.dark){$("body")[0].classList.remove("bodyLight"),$("#nav").removeClass("navLight"),$("#dropdown_options").removeClass("dropdown_optionsLight"),$("#dropdown").html($("#dropdown").html().replace("black","white")),$("#theme_check").removeClass("none");let e=$("a");for(i=0;i<e.length;i++)e[i].classList.remove("aLight");let t=$(".selectedLight");for(i=0;i<t.length;i++)t[i].classList.replace("selectedLight","selected");window.localStorage.dark=!0}else{$("body")[0].classList.add("bodyLight"),$("#nav").addClass("navLight"),$("#dropdown_options").addClass("dropdown_optionsLight"),$("#dropdown").html($("#dropdown").html().replace("white","black")),$("#theme_check").addClass("none");let e=$("a");for(i=0;i<e.length;i++)e[i].classList.add("aLight");let t=$(".selected");for(i=0;i<t.length;i++)t[i].classList.replace("selected","selectedLight");window.localStorage.dark=!1}},v=function(){$("body")[0].classList.add("bodyLight"),$("#nav").addClass("navLight"),$("#dropdown_options").addClass("dropdown_optionsLight"),$("#dropdown").html($("#dropdown").html().replace("white","black")),$("#theme_check").addClass("none");let e=$("a");for(i=0;i<e.length;i++)e[i].classList.add("aLight");let t=$(".selected");for(i=0;i<t.length;i++)t[i].classList.replace("selected","selectedLight")};"false"==window.localStorage.dark&&v(),$("#theme").off().on("click",k);