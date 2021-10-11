const mobile = function(){
    window.$('#holder').addClass('margin0')
    window.$('#nowPlaying').addClass('nowPlayingMobile')
}
const desktop = function(){
    window.$('#holder').removeClass('margin0')
    window.$('#nowPlaying').removeClass('nowPlayingMobile')
}

let changeAt = 44.5
const mobileDesktopStart = function(){
    if(window.$(window).width() / parseFloat(window.$("body").css("font-size")) < changeAt) mobile();
    window.$('#holder').removeClass('none').addClass('ts300ms')
}

const mobileDesktopSizeHandler = function(){
    
    let emWidth = window.$(window).width() / parseFloat(window.$("body").css("font-size"))
    if(emWidth < changeAt){
        mobile()
    }
    else{
        desktop()
    }
}

export { mobileDesktopSizeHandler, mobileDesktopStart }