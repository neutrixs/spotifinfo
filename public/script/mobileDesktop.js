const mobile = function(){
    $('#holder').addClass('margin0')
    $('#nowPlaying').addClass('nowPlayingMobile')
}
const desktop = function(){
    $('#holder').removeClass('margin0')
    $('#nowPlaying').removeClass('nowPlayingMobile')
}

let changeAt = 44.5
if($(window).width() / parseFloat($("body").css("font-size")) < changeAt) mobile();
$('#holder').removeClass('none').addClass('ts300ms')

const mobileDesktopSizeHandler = function(){
    let width = this.innerWidth;
    
    let emWidth = $(window).width() / parseFloat($("body").css("font-size"))
    if(emWidth < changeAt){
        mobile()
    }
    else{
        desktop()
    }
}