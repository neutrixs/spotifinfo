const outStart = function(loginParam){
    if(window.localStorage['force'] == 'true'){
        loginParam.force = true
    }
    if(window.localStorage['dark'] == 'false'){
        $('#profile').attr('src','/img/Spotify_Icon_RGB_Black.png')
    }
}

export { outStart }